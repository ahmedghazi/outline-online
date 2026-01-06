// import { NextApiResponse } from "next";
// import { NextRequest, NextResponse } from "next/server";
// import nodemailer from "nodemailer";
// import { client } from "../../sanity-api/sanity.client";
// import { Product, ProductBundle, Typeface } from "@/app/types/schema";

// type SendProps = {
//   payload: any;
//   client_name: string;
//   destination: string;
// };

// type ProductOrderData = {
//   productId: string;
//   // licenseCategoryZip: string
//   licenseWeb: boolean;
//   licenseDesktop: boolean;
//   type: "bundle" | "single";
//   bundleOrSingleKey: string;
// };

// export async function POST(req: NextRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     // res.status(405).json({ message: "INVALID_METHOD" });
//     // return;
//     return new NextResponse(JSON.stringify({ message: "INVALID_METHOD" }), {
//       status: 405,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   try {
//     const body = await req.json(); // res now contains body
//     // console.log(body);
//     const { eventName } = body;
//     if (eventName === "order.completed") {
//       const { items, user } = body.content;
//       // console.log(items);

//       /*
//       on a
//       - licenses
//       - metadata
//       - - productId
//       - - type: "bundle" | "single";
//       - - bundle or single ref Id

//       on veut
//       [
//         {
//           zipName
//           zipUrl
//         },
//         {
//           zipName
//           zipUrl
//         }
//       ]
//       */

//       const _productOrderData = _collectProductsOrderData(items);
//       const _finalZips = await _getFinalZips(_productOrderData);
//       // return new NextResponse(JSON.stringify(_productOrderData), {
//       //   status: 500,
//       //   headers: { "Content-Type": "application/json" },
//       // });
//       /**
//        * on a les items,
//        * dans items, parser metadata
//        * dans items, récup license pour savoir quels zip envoyer (Web/Desktop)
//        * on a besoin des zip
//        */
//       // const _typefacesId = _collectTypefacesId(items);
//       // const _zipFiles = await _collectTypefacesZip(_typefacesId);
//       /**
//        * collect product ids from items.metada
//        */
//       const _productIds = await _collectProductsId(items);

//       /**
//        * from these ids get content (bundles, singles)
//        */
//       const _productsData = await _collectProductsData(_productIds);

//       /**
//        * filter content to get only bundles and zip that are in items.metadata
//        */
//       const _zipFiles = await _filterBundlesOrSingles(items, _productsData);

//       return new NextResponse(JSON.stringify(_productOrderData), {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       });
//       const _attachments = await _generateAttachments(_zipFiles);
//       console.log(_attachments);

//       const params: SendProps = {
//         destination: user.email,
//         client_name: `${user.billingAddress.fullName}`,
//         payload: _attachments,
//       };
//       const _sendEmailresult = await _sendEmail(params);
//       if (_sendEmailresult.status === "success") {
//         const response_success = {
//           ok: true,
//           message: "success",
//           data: JSON.stringify(_sendEmailresult),
//         };
//         // console.log(response_success);
//         return new NextResponse(JSON.stringify(response_success), {
//           status: 201,
//           headers: { "Content-Type": "application/json" },
//         });
//       } else {
//         const response_error = {
//           ok: false,
//           status: "error",
//           message: "something went wrong with the email",
//           // raw: error,
//         };
//         return new NextResponse(JSON.stringify(response_error), {
//           status: 500,
//           headers: { "Content-Type": "application/json" },
//         });
//       }
//     }
//   } catch (error: any) {
//     console.log(error);
//     const response_error = {
//       ok: false,
//       status: "error",
//       message: error.message,
//       raw: error,
//     };
//     return new NextResponse(JSON.stringify(response_error), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

// const _collectProductsOrderData = (items: any): ProductOrderData[] => {
//   let _data: ProductOrderData[] = [];
//   // items.forEach((el: any) => {
//   //   const _ProductOrderData: ProductOrderData = {

//   //   }
//   //   _data.push()
//   // }
//   return items.map((item: any) => {
//     const metadata = JSON.parse(item.metadata);
//     const { productId, type, _key } = metadata;

//     return {
//       productId: productId,
//       type: type,
//       bundleOrSingleKey: _key,
//       licenseDesktop: _getLicenseWebOrDesktop(item.customFields, "desktop"),
//       licenseWeb: _getLicenseWebOrDesktop(item.customFields, "web"),
//     };
//   });
// };

// /*
//   SEARCH ORDER CUSTOM FIELDS (VARIANTS),
// */
// const _getLicenseWebOrDesktop = (input: any[], searchFor: string): boolean => {
//   let returnValue: boolean = false;
//   const values =
//     searchFor === "web"
//       ? ["web", "app/game/epub"]
//       : ["desktop/print", "logo", "social-media/ad", "video/streaming"];
//   const filteredLicensesByType = input.filter(
//     (el) => values.indexOf(el.name.toLowerCase()) > -1
//   );
//   //ici on a les licenses web ou desktop triées
//   // maintenant on doit filter les licenses achetées
//   if (filteredLicensesByType.length > 0) {
//     const activeLicenses = filteredLicensesByType.filter(
//       (el) => el.value === "true"
//     );
//     returnValue = activeLicenses.length > 0;
//   }
//   return returnValue;
// };

// const _getFinalZips = async (items: ProductOrderData[]) => {
//   for await (const item of items) {
//     const productData = await _getProductData(item);
//   }
// };

// const _collectProductsId = (items: any) => {
//   let _ids: string[] = [];
//   items.forEach((element: any) => {
//     const metadata = JSON.parse(element.metadata);
//     const { productId } = metadata;
//     _ids.push(productId);
//   });
//   return _ids;
// };

// const _collectProductsData = async (_ids: string[]) => {
//   const query = `*[_type == "product" && _id in $_ids
//     ]{
//     title,
//     singles[]{
//       _key,
//       title,
//       zipDesktop{
//         asset->{
//           url
//         }
//       },
//       zipWeb{
//         asset->{
//           url
//         }
//       }
//     },
//     bundles[]{
//       _key,
//       title,
//       zipDesktop{
//         asset->{
//           url
//         }
//       },
//       zipWeb{
//         asset->{
//           url
//         }
//       }
//     }
//   }`;
//   const res = await client.fetch(query, { _ids: _ids });
//   return res;
// };

// /**
//  * 2 arrays, one with items from snipcart, one with products from sanity
//  * items (metadata): Snipcart
//  * _productsData (bundleOrSingle): Sanity
//  *
//  */

// const _filterBundlesOrSingles = async (
//   items: any,
//   _productsData: Product[]
// ) => {
//   let zips: any[] = [];
//   items.forEach((element: any) => {
//     const metadata = JSON.parse(element.metadata);
//     const { _key, type } = metadata;

//     _productsData.forEach((el) => {
//       const bundleOrSingleFiltered: any = _getBundleOrSingle(type, _key, el);
//       // console.log(bundleOrSingleFiltered);
//       if (bundleOrSingleFiltered) {
//         bundleOrSingleFiltered[0].typefaceTitle = el.title;
//         console.log(el.title);
//         zips.push(bundleOrSingleFiltered[0]);
//       }
//     });
//   });
//   // console.log(zips);

//   return zips;
// };

// const _getBundleOrSingle = (
//   type: string,
//   _key: string,
//   _productData: Product
// ) => {
//   const bundleOrSingle =
//     type === "bundle" ? _productData.bundles : _productData.singles;

//   return bundleOrSingle?.filter((el) => el._key === _key);
// };

// const _getZipByCategoryZip = (categoryZip: string) => {};

// const _generateAttachments = (items: any) => {
//   return items.map((item: any) => {
//     if (item.zip) {
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

// const _sendEmail = async ({ destination, client_name, payload }: SendProps) => {
//   // sendGridMail.setApiKey(process.env.SENDGRID_API_KEY || "");
//   console.log("_sending to :", destination);

//   const transporter = nodemailer.createTransport({
//     host: "asmtp.mail.hostpoint.ch",
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.SENDER_EMAIL,
//       pass: process.env.SENDER_PASSWORD,
//     },
//   });

//   var mailOptions = {
//     from: process.env.SENDER_EMAIL,
//     to: destination,
//     subject: "Your Outline Online fonts",
//     // text: "le message: " + JSON.stringify(payload),
//     //[@company Name?]
//     html: `
//       <div style="font-family:monospace,sans-serif">
//         <p>Dear ${client_name},</p>
//         <p>Your payment has been successfully processed. You can find the font files for download below in the zip files along with our EULA. If any problems might occur, please get in touch through info@outline-online.com. A PDF with an invoice is included in this email.</p>
//         <p>Thank you for using Outline Online typefaces!</p>
//         <p>Best from,<br />
//         Outline Online</p>

//         <p>P.S. We would love to see our typefaces in use, so don’t hesitate to reach out to us at info@outline-online.com with your designs!</p>
//       </div>
//     `,
//     attachments: payload,
//   };

//   /*
//    <p>Dear @ ${destination} [@company Name?],</p>
//    <p>Your payment has been successfully processed. You can find the font files for download below in the zip files along with our EULA. If any problems might occur, please get in touch through info@outline-online.com. A PDF with an invoice is included in this email.</p>
//    <p>Thank you for using Outline Online typefaces!</p>
//    <p>Best from,<br />
//   Outline Online</p>

//   <p>P.S. We would love to see our typefaces in use, so don’t hesitate to reach out to us at info@outline-online.com with your designs!</p>
//   */

//   try {
//     const res = await transporter.sendMail(mailOptions);
//     console.log(res);
//     return {
//       status: "success",
//       raw: res,
//     };
//   } catch (error) {
//     console.log(error);
//     //throw new Error(error);
//     return {
//       status: "error",
//       raw: error,
//     };
//   }
// };
