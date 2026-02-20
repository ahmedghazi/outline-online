import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ProductData } from "@/app/types/extra-types";
import { _licensesTypesToString } from "@/app/components/shop/utils";
import website from "@/app/config/website";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { products } = (await req.json()) as { products: ProductData[] };

  if (!Array.isArray(products) || products.length === 0) {
    return NextResponse.json(
      { error: "The products field must be a non-empty array." },
      { status: 400 },
    );
  }

  try {
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      products.map((product) => ({
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(product.finalPrice * 100),
          product_data: {
            name: product.fullTitle,
            description: `${
              product.productType === "productSingle"
                ? "Single License"
                : "Bundle License"
            } — ${_licensesTypesToString(product.licenseTypes)} (${product.licenseSize})`,
            metadata: {
              sku: product.sku,
              productId: product.productId,
              productType: product.productType,
              bundleOrSingleKey: product.bundleOrSingleKey,
              licenseSize: product.licenseSize,
              licenseTypes: product.licenseTypes,
            },
          },
        },
      }));

    // Store lean product data in session metadata for webhook fulfillment
    const productsForMetadata = products.map((p) => ({
      sku: p.sku,
      productId: p.productId,
      productType: p.productType,
      bundleOrSingleKey: p.bundleOrSingleKey,
      licenseTypes: p.licenseTypes,
      licenseSize: p.licenseSize,
      finalPrice: p.finalPrice,
      fullTitle: p.fullTitle,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${website.url}/post-checkout?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${website.url}/post-checkout?status=canceled`,
      metadata: {
        products_json: JSON.stringify(productsForMetadata),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe session creation failed:", error);
    return NextResponse.json(
      { error: "Stripe checkout failed", details: error?.message ?? error },
      { status: 400 },
    );
  }
}
