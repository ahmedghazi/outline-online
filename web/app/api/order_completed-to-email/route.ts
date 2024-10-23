import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { client } from "../../utils/sanity-client";
import { Typeface } from "@/app/types/schema";

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    // res.status(405).json({ message: "INVALID_METHOD" });
    // return;
    return new NextResponse(JSON.stringify({ message: "INVALID_METHOD" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json(); // res now contains body
    // console.log(body);
    const { eventName } = body;
    if (eventName === "order.completed") {
      const { items, user } = body.content;
      // console.log(items);

      /**
       * on a les items,
       * dans items, parser metadata
       * on a besoin des zip
       */
      const _typefacesId = _collectTypefacesId(items);
      const _zipFiles = await _collectTypefacesZip(_typefacesId);
      const _attachments = await _generateAttachments(_zipFiles);
      console.log(_attachments);

      const params: SendProps = {
        destination: user.email,
        payload: _attachments,
      };
      const _sendEmailresult = await _sendEmail(params);
      if (_sendEmailresult.status === "success") {
        const response_success = {
          ok: true,
          message: "success",
          data: JSON.stringify(_sendEmailresult),
        };
        // console.log(response_success);
        return new NextResponse(JSON.stringify(response_success), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        const response_error = {
          ok: false,
          status: "error",
          message: "something went wrong with the email",
          // raw: error,
        };
        return new NextResponse(JSON.stringify(response_error), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }
  } catch (error: any) {
    console.log(error);
    const response_error = {
      ok: false,
      status: "error",
      message: error.message,
      raw: error,
    };
    return new NextResponse(JSON.stringify(response_error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

type SendProps = {
  payload: any;
  destination: string;
};

const _collectTypefacesId = (items: any) => {
  let _ids: String[] = [];
  items.forEach((element: any) => {
    const metadata = JSON.parse(element.metadata);
    const { typefaces } = metadata;
    const _typefacesId = typefaces.map((item: any) => item._id);
    _ids = [..._ids, ..._typefacesId];
  });
  return _ids;
};

const _collectTypefacesZip = async (_ids: any) => {
  const query = `*[_type == "typeface"
    && _id in $_ids
  ]{
    title,
    style,
    zip{
      asset->{
        url
      }
    }
  }`;

  const res = await client.fetch(query, { _ids: _ids });
  const validData = res.filter((el: Typeface) => el.zip !== null);
  // const data = await res.json();
  // console.log(res);
  return validData;
};

const _generateAttachments = (items: any) => {
  return items.map((item: Typeface) => {
    if (item.zip) {
      return {
        filename: `${item.title}-${item.style}.zip`,
        path: item.zip.asset.url,
      };
    } else {
      return {
        filename: "no zip found",
        path: "",
      };
    }
  });
};

const _sendEmail = async ({ destination, payload }: SendProps) => {
  // sendGridMail.setApiKey(process.env.SENDGRID_API_KEY || "");
  console.log("_sending to :", destination);

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
    to: destination,
    subject: "Your fonts :)",
    // text: "le message: " + JSON.stringify(payload),
    html: `
      <div style="font-family:monospace,sans-serif">
        <p>hi ${destination}</p>
        <p>Thx for your request.</p>
        <p>You will found attached the fonts you bought.</p>
        <p>Cheers from Outline Online.</p>
      </div>
    `,
    attachments: payload,
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
