import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { waitUntil } from "@vercel/functions";
import { ProductData } from "@/app/types/extra-types";
import {
  collectProductsOrderData,
  collectProductsOrderZips,
  generateAttachments,
  getOrderStatus,
  patchOrderEmailStatus,
  saveOrder,
  sendEmail,
} from "@/app/lib/fulfillment";

// Fulfillment (Sanity zip lookups + SendGrid) runs in the background via
// waitUntil after the response is sent, so it needs more than the default
// ceiling to finish. Stripe only gets a fast ack; it does not wait on this.
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  console.log("Webhook received");
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Idempotency: order creation and email sending are tracked separately
    // (emailSent), so a redelivered event only skips work that already
    // succeeded rather than short-circuiting a fulfillment that never sent
    // the email.
    const existing = await getOrderStatus(session.id).catch((error) => {
      console.error("Failed to look up existing order:", error);
      return null;
    });

    if (existing?.emailSent) {
      console.log("Order already fulfilled and emailed, skipping duplicate");
      return NextResponse.json({ received: true });
    }

    waitUntil(fulfillOrder(stripe, session, existing?._id ?? null));
  }

  return NextResponse.json({ received: true });
}

async function fulfillOrder(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
  existingOrderId: string | null,
) {
  try {
    // Reassemble chunked products from session metadata
    const chunksCount = parseInt(
      session.metadata?.products_chunks || "0",
      10,
    );
    let productsJson = "";
    for (let i = 0; i < chunksCount; i++) {
      productsJson += session.metadata?.[`products_${i}`] || "";
    }
    const rawProducts = JSON.parse(productsJson || "[]") as Array<{
      s: string;
      p: string;
      t: string;
      b: string;
      l: string;
      z: string;
      f: number;
      n: string;
    }>;
    // Map back to ProductData shape (only fields needed for fulfillment)
    const products = rawProducts.map((r) => ({
      sku: r.s,
      productId: r.p,
      productType: r.t as ProductData["productType"],
      bundleOrSingleKey: r.b,
      licenseTypes: r.l,
      licenseSize: r.z,
      finalPrice: r.f,
      fullTitle: r.n,
    })) as ProductData[];
    const customerEmail = session.customer_details?.email || "";

    // Fulfillment: fetch zips, save order, send email
    const productOrderData = collectProductsOrderData(products);
    const productOrderDataZips =
      await collectProductsOrderZips(productOrderData);
    const attachments = generateAttachments(productOrderDataZips);

    console.log("Got attachments, ready to send email");

    const clientName = session.customer_details?.name || customerEmail;

    let invoicePdfUrl: string | null = null;
    if (session.invoice) {
      const invoice = await stripe.invoices.retrieve(
        session.invoice as string,
      );
      invoicePdfUrl = invoice.invoice_pdf ?? null;
    }

    const customFields = (session.custom_fields ?? []).map((f) => ({
      key: f.label?.custom ?? f.key,
      val: f.text?.value ?? f.numeric?.value ?? f.dropdown?.value ?? "",
    }));

    let orderId = existingOrderId;
    if (!orderId) {
      const orderPayload = {
        email: customerEmail,
        invoiceNumber: session.id,
        creationDate: new Date().toISOString(),
        status: session.payment_status || "paid",
      };

      const stored = await saveOrder(
        orderPayload,
        attachments,
        {
          session: session,
          products,
        },
        invoicePdfUrl,
        customFields,
      );
      orderId = stored?.results?.[0]?.id ?? null;
      console.log("Stored order", orderId);
    }

    const emailResult = await sendEmailWithRetry({
      destination: customerEmail,
      client_name: clientName,
      payload: attachments,
      invoicePdfUrl,
      customFields,
    });

    if (orderId) {
      await patchOrderEmailStatus(
        orderId,
        emailResult.status === "success",
        emailResult.status === "error" ? String(emailResult.raw) : undefined,
      );
    }

    if (emailResult.status === "error") {
      console.error(
        "Fulfillment email failed after retries:",
        emailResult.raw,
      );
    }
  } catch (error) {
    console.error("Fulfillment error:", error);
  }
}

async function sendEmailWithRetry(
  params: Parameters<typeof sendEmail>[0],
  attempts = 3,
) {
  let lastResult: Awaited<ReturnType<typeof sendEmail>>;
  for (let i = 0; i < attempts; i++) {
    lastResult = await sendEmail(params);
    if (lastResult.status === "success") return lastResult;
    if (i < attempts - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** i));
    }
  }
  return lastResult!;
}
