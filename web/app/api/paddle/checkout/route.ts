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
     * ------------------------------------- */
    const itemsWithDiscount = items.filter(
      (item) => item.price.customData?.shouldApplyDiscount,
    );
    console.log(itemsWithDiscount);

    if (itemsWithDiscount.length > 0) {
      // const priceIds = transaction.items?.map((item) => item.price?.id);
      // console.log("***priceIds***");
      // console.log(priceIds);
      // if (!priceIds) {
      //   throw new Error("Price ID not found on transaction item");
      // }
      const discountedIndexes = items
        .map((item, index) =>
          item.price?.customData?.shouldApplyDiscount ? index : null,
        )
        .filter((index): index is number => index !== null);

      const priceIds = discountedIndexes
        .map((index) => transaction.items?.[index]?.price?.id)
        .filter((id): id is string => typeof id === "string");

      await paddle.transactions.update(transaction.id, {
        discount: {
          type: "percentage",
          amount: String("15"),
          description: "Custom line-item discount",
          restrictTo: priceIds,
        },
      });
    }
    // if (customData?.shouldApplyDiscount) {
    //   const firstItemPriceId =
    //     transaction.items?.[0]?.price?.id;

    //   if (!firstItemPriceId) {
    //     throw new Error("Price ID not found on transaction item");
    //   }

    //   await paddle.transactions.update(transaction.id, {
    //     discount: {
    //       type: "percentage",
    //       amount: String(customData.discountPercentage ?? 0),
    //       description: "Custom line-item discount",
    //       restrictTo: [firstItemPriceId],
    //     },
    //   });
    // }

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
