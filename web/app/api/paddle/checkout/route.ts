import { NextRequest, NextResponse } from "next/server";
import { Environment, Paddle } from "@paddle/paddle-node-sdk";
import { CurrencyCode } from "@paddle/paddle-js";

/*
  interface INonCatalogBasePriceRequestBody {
      name?: string | null;
      description: string;
      unitPrice: IMoney;
      billingCycle?: ITimePeriod | null;
      trialPeriod?: ITimePeriod | null;
      taxMode?: TaxMode;
      unitPriceOverrides?: IUnitPriceOverride[];
      quantity?: IPriceQuantity;
      customData?: ICustomData | null;
  }
  */

const paddle = new Paddle(process.env.PADDLE_SECRET_KEY!, {
  environment:
    process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === "production"
      ? Environment.production
      : Environment.sandbox,
});

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    // res.status(405).json({ message: "INVALID_METHOD" });
    // return;
    return new NextResponse(JSON.stringify({ message: "INVALID_METHOD" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }
  // console.log(req.body);
  const body = await req.json(); // res now contains body
  const { items, customData } = body as { items?: any[]; customData?: any };
  const { souldApplyDiscount } = customData;
  // Basic validation before calling Paddle API
  if (!Array.isArray(items) || items.length === 0) {
    return new NextResponse(
      JSON.stringify({
        error: "Validation error",
        details: "The items field is required and must be a non-empty array.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }
  // console.log(items);

  //export type TaxCategory = 'digital-goods' | 'ebooks' | 'implementation-services' | 'professional-services' | 'saas' | 'software-programming-services' | 'standard' | 'training-services' | 'website-hosting';

  try {
    const transactionData = {
      currencyCode: "EUR" as CurrencyCode,
      items: items,
      customData: customData,
    };
    // if (souldApplyDiscount) {
    //   transactionData.discount = {
    //     type: "percentage",
    //     description: "Multiple licenses discount 25%",
    //     amount: "25",
    //     recur: true,
    //     // maximum_recurring_intervals: 6,
    //   };
    // }
    // const tsx = await paddle.transactions.create({
    //   currencyCode: "EUR",
    //   items: items,
    //   customData: customData,
    // });
    const tsx = await paddle.transactions.create(transactionData as any);
    // console.log(tsx);
    return NextResponse.json({ tsx: tsx.id });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({
        error: "Paddle transaction create failed",
        details: (error as any)?.message || error,
        items,
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }
}
