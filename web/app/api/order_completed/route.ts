import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { client } from "../../utils/sanity-client";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    // res.status(405).json({ message: "INVALID_METHOD" });
    // return;
    return new NextResponse(JSON.stringify({ message: "INVALID_METHOD" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await req.json(); // res now contains body
  const { items, user } = body.content;

  console.log(body);
  return new NextResponse(JSON.stringify(body), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
