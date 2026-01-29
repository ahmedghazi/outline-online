import { NextRequest, NextResponse } from "next/server";
import {
  CreateTransactionRequestBody,
  Environment,
  Paddle,
} from "@paddle/paddle-node-sdk";
import { CurrencyCode } from "@paddle/paddle-js";

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
  // const { souldApplyDiscount } = customData;
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

  try {
    const transactionData: CreateTransactionRequestBody = {
      currencyCode: "EUR" as CurrencyCode,
      items: items,
      customData: customData,
    };

    const tsx = await paddle.transactions.create(transactionData as any);
    // console.log(tsx);
    return NextResponse.json({ transactions: tsx, transactionID: tsx.id });
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

/**
 * This works
 */
// if (souldApplyDiscount) {
//   transactionData.discount = {
//     type: "percentage",
//     description: "Multiple licenses discount 25%",
//     amount: "25",
//     recur: true,
//     // maximum_recurring_intervals: 6,
//   };
// }
