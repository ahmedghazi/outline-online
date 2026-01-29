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
  const body = await req.json();
  const { items, customData } = body as {
    items: any[];
    customData?: {
      shouldApplyDiscount?: boolean;
      discountPercentage?: number;
    };
  };

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      {
        error: "Validation error",
        details: "The items field must be a non-empty array.",
      },
      { status: 400 },
    );
  }

  try {
    /* ---------------------------------------
     * STEP 1 — Create transaction
     * ------------------------------------- */
    const transactionData: CreateTransactionRequestBody = {
      currencyCode: "EUR" as CurrencyCode,
      items,
      customData,
    };

    const transaction = await paddle.transactions.create(
      transactionData as any,
    );

    /* ---------------------------------------
     * STEP 2 — Apply item-level discount
     * Uses the combined discount (product + license discount) from frontend
     * ------------------------------------- */
    const itemsWithDiscount = items.filter(
      (item) => item.price.customData?.shouldApplyDiscount,
    );

    if (itemsWithDiscount.length > 0) {
      const discountedIndexes = items
        .map((item, index) =>
          item.price?.customData?.shouldApplyDiscount ? index : null,
        )
        .filter((index): index is number => index !== null);

      const priceIds = discountedIndexes
        .map((index) => transaction.items?.[index]?.price?.id)
        .filter((id): id is string => typeof id === "string");

      // Get the discount percentage from the first discounted item
      // All items should have the same combined discount when multiple licenses are selected
      const discountPercentage =
        itemsWithDiscount[0]?.price?.customData?.discountPercentage || 15;

      await paddle.transactions.update(transaction.id, {
        discount: {
          type: "percentage",
          amount: String(discountPercentage),
          description: "Discount",
          restrictTo: priceIds,
        },
      });
    }

    return NextResponse.json({
      transactionId: transaction.id,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Paddle transaction failed",
        details: error?.message ?? error,
      },
      { status: 400 },
    );
  }
}
