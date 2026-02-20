import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ProductData } from "@/app/types/extra-types";
import { client } from "@/app/sanity-api/sanity.client";
import {
  collectProductsOrderData,
  collectProductsOrderZips,
  generateAttachments,
  saveOrder,
  sendEmail,
} from "@/app/lib/fulfillment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

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

    try {
      // Idempotency: check if order already exists
      const existingCount = await client.fetch(
        `count(*[_type == "order" && invoiceNumber == $inv])`,
        { inv: `#${session.id}` },
      );
      if (existingCount > 0) {
        console.log("Order already fulfilled, skipping duplicate");
        return NextResponse.json({ received: true });
      }

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

      const orderPayload = {
        email: customerEmail,
        invoiceNumber: session.id,
        creationDate: new Date().toISOString(),
        status: session.payment_status || "paid",
      };

      const stored = await saveOrder(orderPayload, attachments, {
        stripeSession: {
          id: session.id,
          payment_intent: session.payment_intent,
          customer_details: session.customer_details,
          amount_total: session.amount_total,
          currency: session.currency,
        },
        products,
      });
      console.log("Stored order", stored);

      const clientName =
        session.customer_details?.name || customerEmail.split("@")[0];

      await sendEmail({
        destination: customerEmail,
        client_name: clientName,
        payload: attachments,
      });
    } catch (error) {
      console.error("Fulfillment error:", error);
      // Return 200 so Stripe doesn't retry endlessly for application errors
    }
  }

  return NextResponse.json({ received: true });
}
