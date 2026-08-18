import sgMail from "@sendgrid/mail";
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

type CustomField = { key: string; val: string };

type SendProps = {
  payload: any;
  client_name: string;
  destination: string;
  invoicePdfUrl?: string | null;
  customFields?: CustomField[];
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
  invoicePdfUrl?: string | null,
  customFields?: CustomField[],
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
          invoicePdfUrl: invoicePdfUrl ?? null,
          custom_fields: customFields ?? [],
          json: JSON.stringify(payloadRaw),
          emailSent: false,
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

/**
 * Looks up an existing order by Stripe checkout session id.
 * Used for idempotency: order creation and email sending are tracked
 * separately so a retried event can resume a failed email send
 * without re-creating the Sanity order or re-attaching zips.
 */
export const getOrderStatus = async (
  sessionId: string,
): Promise<{ _id: string; emailSent?: boolean } | null> => {
  return client.fetch(
    `*[_type == "order" && invoiceNumber == $inv][0]{ _id, emailSent }`,
    { inv: `#${sessionId}` },
  );
};

export const patchOrderEmailStatus = async (
  orderId: string,
  emailSent: boolean,
  emailError?: string,
) => {
  const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;
  await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.SANITY_API_READ_TOKEN}`,
    },
    body: JSON.stringify({
      mutations: [
        {
          patch: {
            id: orderId,
            set: {
              emailSent,
              emailError: emailError ?? null,
            },
          },
        },
      ],
    }),
  });
};

const withTimeout = <T>(promise: Promise<T>, ms: number, label: string): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms),
    ),
  ]);
};

export const sendEmail = async ({
  destination,
  client_name,
  payload,
  invoicePdfUrl,
  customFields,
}: SendProps) => {
  console.log("_sending to :", destination);

  if (!process.env.SENDGRID_API_KEY) {
    return {
      status: "error" as const,
      raw: new Error("SENDGRID_API_KEY is not configured"),
    };
  }
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    const attachments = await Promise.all(
      (payload as Array<{ filename: string; path: string }>).map(
        async (item) => {
          const res = await withTimeout(
            fetch(item.path),
            10000,
            `Download ${item.filename}`,
          );
          if (!res.ok) {
            throw new Error(
              `Failed to download attachment ${item.filename}: ${res.status}`,
            );
          }
          const buffer = Buffer.from(await res.arrayBuffer());
          return {
            filename: item.filename,
            content: buffer.toString("base64"),
            type: "application/zip",
            disposition: "attachment",
          };
        },
      ),
    );

    const msg = {
      from: process.env.SENDER_EMAIL!,
      to: destination,
      cc: "info@outline-online.com",
      subject: "Your Outline Online fonts",
      html: `
        <div style="font-family:monospace,sans-serif">
        <p>Dear ${client_name},</p>
        <p>Thank you for your order with Outline Online!</p>

        <p>Your payment has been successfully processed. You'll find the font files here attached. If you run into any issues, please don't hesitate to get in touch.</p>
        ${invoicePdfUrl ? `<p><a href="${invoicePdfUrl}">Download your invoice (PDF)</a></p>` : ""}
        ${
          customFields && customFields.length > 0
            ? `
        <table style="border-collapse:collapse;margin:16px 0">
          ${customFields.map((f) => `<tr><td style="padding:4px 12px 4px 0;">${f.key}:</td><td style="padding:4px 0">${f.val}</td></tr>`).join("")}
        </table>`
            : ""
        }

        <p>Best from,<br />
    Outline Online</p>

        <p>P.S. We'd also love to see our typefaces in use, so feel free to send us images of your work anytime!</p>

        </div>
      `,
      attachments,
    };

    const res = await withTimeout(sgMail.send(msg), 15000, "SendGrid send");
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
