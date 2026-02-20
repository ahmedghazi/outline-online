//https://mailtrap.io/blog/nodemailer-gmail/
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import sendGridMail from "@sendgrid/mail";
import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// require("dotenv").config();
// import sanityClient from "@sanity/client";
import { Product, ProductSingle, Typeface } from "@/app/types/schema";
import { client } from "@/app/sanity-api/sanity.client";
import { v4 as uuidv4 } from "uuid";
import website from "@/app/config/website";
// const client = sanityClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   apiVersion: "2021-08-29",
//   useCdn: true,
//   withCredentials: true,
//   token: process.env.SANITY_API_READ_TOKEN,
// });

type SendProps = {
  error?: any;
  client_name: string;
  destination: string;
  linksExpire?: string;
};

export async function POST(req: NextRequest, res: NextApiResponse) {
  // console.log("SENDER_EMAIL", process.env.SENDER_EMAIL);
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

    const { data } = body;
    const { clientInfos, trials } = data;
    const destination = clientInfos.email;
    const client_name = `${clientInfos.first_name} ${clientInfos.last_name}`;

    /**
     * collect product ids from items.metada
     */
    const _productIds = _collectProductsId(trials);

    /**
     * from these ids get content (bundles, singles)
     */
    const _productsData = await _collectProductsData(_productIds);
    console.log(_productsData);
    const _attachments = _collectZips(_productsData);
    console.log(_attachments);

    //create a linkExpire for the attachements
    const _linksExpire = await _createLinksExpire(_attachments);
    console.log(_linksExpire);
    // return new NextResponse(JSON.stringify(_linksExpire), {
    //   status: 201,
    //   headers: { "Content-Type": "application/json" },
    // });
    const params: SendProps = {
      destination: destination,
      client_name: client_name,
      linksExpire: `${website.url}/api/link-expire?token=${_linksExpire.token}`,
    };
    // _sendEmail(destination, _downloadButtons);
    // return new NextResponse(JSON.stringify(_attachments), {
    //   status: 500,
    //   headers: { "Content-Type": "application/json" },
    // });
    const _sendEmailresult = await _sendEmail(params);
    console.log(_sendEmailresult);

    // const messError = await _sendErrorEmail(paramsLogs);

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
      const paramsLogs: SendProps = {
        destination: "atmet.ghazi@gmail.com",
        client_name: "atmet.ghazi@gmail.com",
        error: _sendEmailresult,
      };

      const messError = await _sendErrorEmail(paramsLogs);

      // console.log('Payload size:', JSON.stringify(body).length / 1024, 'KB');
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
  } catch (error: any) {
    console.log(error);
    const params: SendProps = {
      destination: "atmet.ghazi@gmail.com",
      client_name: "atmet.ghazi@gmail.com",
      error: error,
    };

    const messError = await _sendErrorEmail(params);
    console.log(messError);
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

const _collectProductsId = (items: Product[]) => {
  let _ids: string[] = [];
  items.forEach((element: any) => {
    // const metadata = JSON.parse(element.metadata);
    const { _id } = element;
    _ids.push(_id);
  });
  return _ids;
};

const _collectProductsData = async (_ids: string[]) => {
  const query = `*[_type == "product" && _id in $_ids
    ]{
    title,
    // singles[]{
    //   _key,
    //   title,
    //   zipTrials{
    //     asset->{
    //       url
    //     }
    //   }
    // }
    zipTrials{
      asset->{
        url
      }
    }
  }`;
  // console.log(query);
  const res = await client.fetch(query, { _ids: _ids });
  // const data = await res.json();
  return res;
};

type ZipType = {
  label: string;
  link: string;
};
const _collectZips = (items: Product[]): ZipType[] => {
  const zips: any[] = [];
  items.forEach((product) => {
    let zip = {};
    if (product.zipTrials) {
      zip = {
        label: `${product.title}-trials.zip`,
        link: product.zipTrials.asset.url,
      };
    } else {
      zip = {
        label: `${product.title} no zip found`,
        link: "",
      };
    }
    zips.push(zip);
  });
  return zips;
};

const _createLinksExpire = async (items: ZipType[]) => {
  try {
    const res = await client.create({
      _type: "linkExpire",
      token: uuidv4(),
      maxDownloads: 3,
      downloads: 0,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      zips: items.map((item) => ({
        _key: uuidv4(),
        _type: "linkExternal",
        label: item.label,
        link: item.link,
        // ...item,
      })),
    });
    return res;
  } catch (error) {
    console.error("Error generating links expire:", error);
    throw new Error("Failed to generate links expire");
  }
};
// const _generateAttachments = (items: any) => {
//   return items.map((item: any) => {
//     if (item.zipTrials) {
//       return {
//         filename: `${item.typefaceTitle}-${item.title}.zip`,
//         path: item.zip.asset.url,
//       };
//     } else {
//       return {
//         filename: "no zip found",
//         path: "",
//       };
//     }
//   });
// };

const _sendEmail = async ({
  destination,
  client_name,
  linksExpire,
}: SendProps) => {
  // sendGridMail.setApiKey(process.env.SENDGRID_API_KEY || "");
  console.log("_sending to :", destination);
  //https://stackoverflow.com/questions/38024428/error-connect-econnrefused-127-0-0-1465-nodemailer

  const transporter = nodemailer.createTransport({
    host: "asmtp.mail.hostpoint.ch",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: destination,
    cc: "info@outline-online.com",
    subject: "Outline Online trial fonts",
    // text: "le message: " + JSON.stringify(payload),
    html: `
      <div style="font-family:monospace,sans-serif">
        <p>Dear ${client_name}</p>
        <p>Thank you for downloading the trial versions of our typefaces! Please, find the download link below.</p>
        <p><a href="${linksExpire}">Download</a></p>
        <p>Outline Online trial fonts come with a full character set, meaning numbers, punctuation, diacritics and specific symbols are all included in the character set. This approach allows the effective testing and functional presentation of our typefaces. Trial font files are intended solely for testing and pitching purposes. In order to use the trial fonts in a published project, the appropriate license needs to be purchased for the respective license holder. By downloading these files, you agree to Outline Online’s End User Licence Agreement (EULA).</p>
        <p>Best from,<br />
        Outline Online</p>
      </div>
    `,
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

const _sendErrorEmail = async ({
  destination,
  client_name,
  error,
}: SendProps) => {
  const transporter = nodemailer.createTransport({
    host: "asmtp.mail.hostpoint.ch",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: destination,
    subject: "Outline Online trial fonts (error)",
    // text: "le message: " + JSON.stringify(payload),
    html: `
      <div style="font-family:monospace,sans-serif">
        <p>Dear ${client_name}</p>
        ${JSON.stringify(error)}
      </div>
    `,
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
    return {
      status: "error",
      raw: error,
    };
  }
};
