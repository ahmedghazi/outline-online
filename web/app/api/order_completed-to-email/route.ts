import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { client } from "../../utils/sanity-client";

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
  console.log(body);
  const { items, user } = body.content;
  console.log(items);
  const params: SendProps = {
    destination: user.email,
    payload: body,
  };
  const _sendResponse = await _sendEmail(params);
  return new NextResponse(JSON.stringify(_sendResponse), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

type SendProps = {
  payload: any;
  destination: string;
};

const _sendEmail = async ({ destination, payload }: SendProps) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // user: process.env.SENDER_EMAIL,
      // pass: process.env.SENDER_PASSWORD,
      user: "oswaldnomadness@gmail.com",
      // pass: "$$$vviirrggiill***",
      pass: "dbom dpcq mtrt hduk",
    },
    secure: true,
  });

  var mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: "hello@ahmedghazi.com",
    subject: "Ydebug order completed",
    html: JSON.stringify(payload),
    // html: `
    //   <p>hi ${destination}</p>
    //   <p>Thx for your request.</p>
    //   <p>You will found attached the trials font you selected.</p>
    //   <p>We offer trial fonts with bextended Western Latin character sets including numbers, and punctuation. Trial font files provided are strictly limited for testing and pitching purposes. By downloading the files, you accept Outline Online’s End User Licence Agreement (EULA). If you download the trial files, and would then like to use the font for a published project, your client will need to purchase the appropriate licence.</p>
    //   <p>Cheers from Outline Online.</p>
    // `,
    // attachments: payload,
  };

  try {
    const res = await transporter.sendMail(mailOptions);
    console.log(res);
    return {
      status: "success",
      raw: res,
    };
  } catch (error) {
    console.log(error);
    //throw new Error(error);
    return {
      status: "error",
      raw: error,
    };
  }
};
