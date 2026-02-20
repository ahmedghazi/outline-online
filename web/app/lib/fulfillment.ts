import nodemailer from "nodemailer";
import { Product } from "@/app/types/schema";
import { ProductData } from "@/app/types/extra-types";
import { client } from "@/app/sanity-api/sanity.client";

export type ProductOrderData = {
  productId: string;
  licenseWeb: boolean;
  licenseDesktop: boolean;
  productType: "productBundle" | "productSingle";
  bundleOrSingleKey: string;
};

type SendProps = {
  payload: any;
  client_name: string;
  destination: string;
};

type OrderPayload = {
  email: string;
  invoiceNumber: string;
  creationDate: string;
  status: string;
};

export const collectProductsOrderData = (
  items: ProductData[],
): ProductOrderData[] => {
  return items.map((item) => {
    const { productId, productType, bundleOrSingleKey, licenseTypes } = item;
    return {
      productId: productId,
      productType: productType,
      bundleOrSingleKey: bundleOrSingleKey,
      licenseDesktop: getLicenseWebOrDesktop(licenseTypes, "desktop"),
      licenseWeb: getLicenseWebOrDesktop(licenseTypes, "web"),
    };
  });
};

const getLicenseWebOrDesktop = (
  licenses: string,
  searchFor: string,
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
    (el: string) => values.indexOf(el.toLowerCase()) > -1,
  );
  if (filteredLicensesByType.length > 0) {
    returnValue = true;
  }
  return returnValue;
};

export const collectProductsOrderZips = async (items: ProductOrderData[]) => {
  const result = [];
  for (const item of items) {
    const data = await getProductData(item.productId);
    const bundleOrSingle = getBundleOrSingle(
      item.productType,
      item.bundleOrSingleKey,
      data,
    );
    const title = `${data.title} ${bundleOrSingle?.title}`;
    const sanitizedData = {
      zipTitle: title,
      licenseWeb: item.licenseWeb,
      licenseDesktop: item.licenseDesktop,
      zipWeb: item.licenseWeb ? bundleOrSingle?.zipWeb : null,
      zipDesktop: item.licenseDesktop ? bundleOrSingle?.zipDesktop : null,
    };
    result.push(sanitizedData);
  }
  return result;
};

const getProductData = async (productId: string) => {
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

const getBundleOrSingle = (
  type: string,
  bundleOrSingleKey: string,
  productData: Product,
) => {
  const bundleOrSingle =
    type === "productBundle" ? productData.bundles : productData.singles;
  const filtered = bundleOrSingle?.filter(
    (el) => el._key === bundleOrSingleKey,
  );
  return filtered ? filtered[0] : null;
};

export const generateAttachments = (items: any) => {
  const result: any[] = [];
  items.forEach((item: any) => {
    if (item.zipWeb) {
      result.push({
        filename: sanitizeTitle(`${item.zipTitle}--web.zip`),
        path: item.zipWeb.asset.url,
      });
    }
    if (item.zipDesktop) {
      result.push({
        filename: sanitizeTitle(`${item.zipTitle}--desktop.zip`),
        path: item.zipDesktop.asset.url,
      });
    }
  });
  return result;
};

const sanitizeTitle = (str: string) =>
  str.replace(/ /g, "-").toLocaleLowerCase();

export const saveOrder = async (
  payload: OrderPayload,
  attachments: any,
  payloadRaw: any,
) => {
  const { email, invoiceNumber, creationDate, status } = payload;
  const _attachments = attachments.map((item: any) => {
    return {
      label: item.filename,
      link: item.path,
    };
  });
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
          json: JSON.stringify(payloadRaw),
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

export const sendEmail = async ({
  destination,
  client_name,
  payload,
}: SendProps) => {
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

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: destination,
    cc: "hello@ahmedghazi.com, info@outline-online.com",
    subject: "Your Outline Online fonts",
    html: `
      <div style="font-family:monospace,sans-serif">
      <p>Dear ${client_name},</p>
      <p>Thank you for your order with Outline Online!</p>

      <p>Your payment has been successfully processed. You'll find the font files here attached. The full order details will also be sent to you shortly. If you run into any issues, please don't hesitate to get in touch.</p>

      <p>Best from,<br />
  Outline Online</p>

      <p>P.S. We'd also love to see our typefaces in use, so feel free to send us images of your work anytime!</p>

      </div>
    `,
    attachments: payload,
  };

  try {
    const res = await transporter.sendMail(mailOptions);
    console.log(res);
    return {
      status: "success" as const,
      raw: res,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error" as const,
      raw: error,
    };
  }
};
