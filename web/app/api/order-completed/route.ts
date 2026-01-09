import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { Product, ProductBundle, Typeface } from "@/app/types/schema";
import { client } from "@/app/sanity-api/sanity-client";
import { ProductData } from "@/app/types/extra-types";

type SendProps = {
  payload: any;
  client_name: string;
  destination: string;
};

type ProductOrderData = {
  productId: string;
  // licenseCategoryZip: string
  licenseWeb: boolean;
  licenseDesktop: boolean;
  // type: "bundle" | "single";
  productType: "productBundle" | "productSingle";
  bundleOrSingleKey: string;
};

interface PaddleWebhookData {
  id: string;
  transaction_id: string;
  status: string;
  currency_code: string;
  custom_data: {
    license_for: string;
    license_for_data: {
      email: string;
      in_use_for: string;
      company_name: string;
    };
  };
  customer: {
    id: string;
    email: string;
    address: {
      country_code: string;
      postal_code: string;
      city: string;
      region: string;
      first_line: string;
    };
    business?: {
      name?: string;
      tax_identifier?: string;
    };
  };
  items: Array<{
    price_id: string;
    product: {
      id: string;
      name: string;
      description: string;
    };
    totals: {
      total: number;
    };
    billing_cycle: any;
  }>;
}

const formatedTimestamp = () => {
  const now = new Date();
  return now.toISOString();
};

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
    // const body = await req.json(); // res now contains body
    // console.log(body);
    // const { eventName } = body;
    const { paddleData, products } = (await req.json()) as {
      paddleData: PaddleWebhookData;
      products: ProductData[];
    };

    // const { paddleData, products } = body;
    // if (eventName === "order.completed") {
    const { status, transaction_id, customer } = paddleData;
    // console.log(transaction_id);

    const _productOrderData = _collectProductsOrderData(products);

    const _productOrderDataZips = await _collectProductsOrderZips(
      _productOrderData
    );

    const _attachments = await _generateAttachments(_productOrderDataZips);
    console.log("got _attachments, ready to send email");
    // return new NextResponse(JSON.stringify(_productOrderDataZips), {
    //   status: 200,
    //   headers: { "Content-Type": "application/json" },
    // });

    /*
  invoiceNumber: string;
  creationDate: string;
    */
    const orderPayload = {
      email: customer.email,
      invoiceNumber: transaction_id,
      creationDate: formatedTimestamp(),
      status: status,
      // licenseSize: products[0]?.licenseSize,
      // licenseTypes: products[0]?.licenseTypes,
    };
    const stored = await _saveOrder(orderPayload, _attachments, {
      paddleData,
      products,
    });
    console.log("Stored order", stored);
    // return new NextResponse(JSON.stringify(stored), {
    //   status: 201,
    //   headers: { "Content-Type": "application/json" },
    // });

    const params: SendProps = {
      destination: customer.email,
      client_name: customer.business?.name || customer.email.split("@")[0],
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

const _collectProductsOrderData = (items: any): ProductOrderData[] => {
  // let _data: ProductOrderData[] = [];

  return items.map((item: any) => {
    // const metadata = JSON.parse(item.metadata);
    const { productId, productType, bundleOrSingleKey, licenseTypes } = item;
    return {
      productId: productId,
      productType: productType,
      bundleOrSingleKey: bundleOrSingleKey,
      licenseDesktop: _getLicenseWebOrDesktop(licenseTypes, "desktop"),
      licenseWeb: _getLicenseWebOrDesktop(licenseTypes, "web"),
    };
  });
};

/*
  SEARCH ORDER CUSTOM FIELDS (VARIANTS),
*/
const _getLicenseWebOrDesktop = (
  licenses: string,
  searchFor: string
): boolean => {
  let returnValue: boolean = false;
  const licensesArray = licenses.split("|");
  const values =
    searchFor === "web"
      ? ["web"]
      : [
          "print",
          "desktop/print",
          "logo",
          "social-media/ad",
          "video/streaming",
          "app/game/epub",
        ];
  const filteredLicensesByType = licensesArray.filter(
    (el: string) => values.indexOf(el.toLowerCase()) > -1
  );
  //ici on a les licenses web ou desktop triées
  // maintenant on doit filter les licenses achetées
  if (filteredLicensesByType.length > 0) {
    // const activeLicenses = filteredLicensesByType.filter(
    //   (el) => el.value === "true"
    // );
    // returnValue = activeLicenses.length > 0;
    returnValue = true;
  }
  return returnValue;
};

const _collectProductsOrderZips = async (items: ProductOrderData[]) => {
  const result = [];
  for await (const item of items) {
    const data = await _getProductData(item.productId);
    const bundleOrsingle = _getBundleOrSingle(
      item.productType,
      item.bundleOrSingleKey,
      data
    );
    console.log(bundleOrsingle);
    // result.push(bundleOrsingle);
    const title = `${data.title} ${bundleOrsingle?.title}`;
    const sanitizedData = {
      zipTitle: title,
      licenseWeb: item.licenseWeb,
      licenseDesktop: item.licenseDesktop,
      zipWeb: item.licenseWeb ? bundleOrsingle?.zipWeb : null,
      zipDesktop: item.licenseDesktop ? bundleOrsingle?.zipDesktop : null,
    };
    result.push(sanitizedData);
  }
  return result;
};

const _getProductData = async (productId: string) => {
  const query = `*[_type == "product" && _id == $productId][0]{
    title,
    singles[]{
      _key,
      title,
      zipDesktop{
        asset->{
          url
        }
      },
      zipWeb{
        asset->{
          url
        }
      }
    },
    bundles[]{
      _key,
      title,
      zipDesktop{
        asset->{
          url
        }
      },
      zipWeb{
        asset->{
          url
        }
      }
    }
  }`;
  const res = await client.fetch(query, { productId: productId });
  return res;
};

/**
 *
 * @param type Bundle or Single
 * @param bundleOrSingleKey Bundle or Single key
 * @param productData Product
 * @returns
 */
const _getBundleOrSingle = (
  type: string,
  bundleOrSingleKey: string,
  productData: Product
) => {
  const bundleOrSingle =
    type === "productBundle" ? productData.bundles : productData.singles;
  const filtered = bundleOrSingle?.filter(
    (el) => el._key === bundleOrSingleKey
  );
  return filtered ? filtered[0] : null;
};

const _generateAttachments = (items: any) => {
  const result: any[] = [];
  items.forEach((item: any) => {
    if (item.zipWeb) {
      result.push({
        filename: _sanitizeTitle(`${item.zipTitle}--web.zip`),
        path: item.zipWeb.asset.url,
      });
    }
    if (item.zipDesktop) {
      result.push({
        filename: _sanitizeTitle(`${item.zipTitle}--desktop.zip`),
        path: item.zipDesktop.asset.url,
      });
    }
  });
  return result;
};

const _sanitizeTitle = (str: string) =>
  str.replace(/ /g, "-").toLocaleLowerCase();

/************************
 * ********************************************************************************************
 */

type PayloadProps = {
  email: string;
  invoiceNumber: string;
  creationDate: string;
  status: string;
};
const _saveOrder = async (
  payload: PayloadProps,
  attachments: any,
  pauloadRaw: any
) => {
  const { email, invoiceNumber, creationDate, status } = payload;
  const _attachments = attachments.map((item: any) => {
    return {
      label: item.filename,
      link: item.path,
    };
  });
  // console.log(_attachments);
  const mutations = {
    mutations: [
      {
        create: {
          _type: "order",
          status: status,
          title: `${invoiceNumber} by ${email}`,
          invoiceNumber: `#${invoiceNumber}`,
          creationDate: new Date(creationDate).toISOString(),
          email: email,
          attachments: _attachments,
          json: JSON.stringify(pauloadRaw),
        },
      },
    ],
  };
  const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}?autoGenerateArrayKeys=true`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.SANITY_API_READ_TOKEN}`,
    },
    body: JSON.stringify(mutations),
  });

  const result = await response.json();
  return result;
};

/************************
 * ********************************************************************************************
 */
const _sendEmail = async ({ destination, client_name, payload }: SendProps) => {
  // sendGridMail.setApiKey(process.env.SENDGRID_API_KEY || "");
  console.log("_sending to :", destination);

  const transporter = nodemailer.createTransport({
    host: "asmtp.mail.hostpoint.ch",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: destination,
    subject: "Your Outline Online fonts",
    // text: "le message: " + JSON.stringify(payload),
    //[@company Name?]
    html: `
      <div style="font-family:monospace,sans-serif">
        <p>Dear ${client_name},</p>
        <p>Your payment has been successfully processed. You can find the font files for download below in the zip files along with our EULA. If any problems might occur, please get in touch through info@outline-online.com. The order details will be sent in a separate email. </p>
        <p>Thank you for using Outline Online typefaces!</p>
        <p>Best from,<br />
        Outline Online</p>
        <p></p>
        <p>P.S. We would love to see our typefaces in use, so don’t hesitate to reach out to us at info@outline-online.com with your designs!</p>
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
