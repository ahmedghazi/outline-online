//https://mailtrap.io/blog/nodemailer-gmail/
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import sendGridMail from "@sendgrid/mail";
import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// require("dotenv").config();
// import sanityClient from "@sanity/client";
import { client } from "../../utils/sanity-client";
import { Product, ProductSingle, Typeface } from "@/app/types/schema";

// const client = sanityClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   apiVersion: "2021-08-29",
//   useCdn: true,
//   withCredentials: true,
//   token: process.env.SANITY_API_READ_TOKEN,
// });

type SendProps = {
  payload: any;
  destination: string;
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

    /**
     * collect product ids from items.metada
     */
    const _productIds = _collectProductsId(trials);

    /**
     * from these ids get content (bundles, singles)
     */
    const _productsData = await _collectProductsData(_productIds);

    const _attachments = _collectZips(_productsData);
    // const _downloadButtons = await _generateDownloadButtons(zipFiles);
    // const _attachments = _generateAttachments(zipFiles);
    // console.log("zipFiles");
    // console.log(zipFiles);
    // console.log(_attachments);

    const params: SendProps = {
      destination: destination,
      payload: _attachments,
    };
    // _sendEmail(destination, _downloadButtons);
    // return new NextResponse(JSON.stringify(_attachments), {
    //   status: 500,
    //   headers: { "Content-Type": "application/json" },
    // });
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

const _collectProductsId = (items: ProductSingle[]) => {
  let _ids: string[] = [];
  items.forEach((element: any) => {
    // const metadata = JSON.parse(element.metadata);
    const { productId } = element;
    _ids.push(productId);
  });
  return _ids;
};

const _collectProductsData = async (_ids: string[]) => {
  const query = `*[_type == "product" && _id in $_ids
    ]{
    title,
    singles[]{
      _key,
      title,
      zipTrials{
        asset->{
          url
        }
      }
    }
  }`;
  // console.log(query);
  const res = await client.fetch(query, { _ids: _ids });
  // const data = await res.json();
  return res;
};

const _collectZips = (items: Product[]) => {
  const zips: any[] = [];
  items.forEach((product) => {
    product.singles?.forEach((single) => {
      let zip = {};
      if (single.zipTrials) {
        zip = {
          filename: `${product.title}-${single.title}.zip`,
          path: single.zipTrials.asset.url,
        };
      } else {
        zip = {
          filename: "no zip found",
          path: "",
        };
      }
      zips.push(zip);
    });
  });
  return zips;
  // return items.map((item: Product) => {
  //   return item.singles?.map((_item) => {
  //     console.log(_item);
  //     if (_item.zipTrials) {
  //       return {
  //         filename: `${item.title}-${_item.title}.zip`,
  //         path: _item.zipTrials.asset.url,
  //       };
  //     } else {
  //       return {
  //         filename: "no zip found",
  //         path: "",
  //       };
  //     }
  //   });
  // });
};

const _generateAttachments = (items: any) => {
  return items.map((item: any) => {
    if (item.zipTrials) {
      return {
        filename: `${item.typefaceTitle}-${item.title}.zip`,
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

// const _generateAttachments = (items: ProductSingle[]) => {
//   return items.map((item: ProductSingle) => {
//     console.log(item);
//     if (item.zipTrials) {
//       return {
//         filename: `${item.typefaceTitle}.zip`,
//         path: item.zipTrials.asset.url,
//       };
//     } else {
//       return {
//         filename: "no zip found",
//         path: "",
//       };
//     }
//   });
// };
// const _generateDownloadButtons = (items: any) => {
//   return items.map((item: Typeface) => {
//     if (item.zip) {
//       return `<a href="${item.zip.asset.url}">${item.title} - ${item.style}</a>`;
//     } else {
//       return "no zip found";
//     }
//   });
// };

const _sendEmail = async ({ destination, payload }: SendProps) => {
  // sendGridMail.setApiKey(process.env.SENDGRID_API_KEY || "");
  console.log("_sending to :", destination);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
      // user: "oswaldnomadness@gmail.com",
      // pass: "$$$vviirrggiill***",
      // pass: "dbom dpcq mtrt hduk",
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
        <p>Dear ${destination}!</p>
        <p>Thank you for downloading the trial versions of our typefaces! Please, find them attached below in this email.</p>
        <p>Outline Online trial fonts come with a full character set, meaning numbers, punctuation, diacritics and specific symbols are all included in the character set. This approach allows the effective testing and functional presentation of our typefaces. Trial font files are intended solely for testing and pitching purposes. In order to use the trial fonts in a published project, the appropriate licence(s) needs to be purchased for the respective license holder. By downloading these files, you agree to Outline Online's End User Licence Agreement (EULA).</p>
        <p>Greetings,<br />
        Outline Online</p>
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

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //     throw new Error(error);
  //   } else {
  //     console.log("Email Sent");
  //     console.log(info);
  //     return info;
  //   }
  // });

  // const str = JSON.stringify(payload);
  // const btns =
  // const html = `
  //     <div>
  //        Hi ${destination}! <br><br>
  //        Thanks for getting in touch.
  //        Here is a link to <a href="${str}">donwload</a> your pack
  //        <br><br>
  //        ${str}
  //        <br><br>
  //        Best <br>
  //        outline online
  //     </div>
  //   `;
  // const mail = {
  //   from: process.env.SENDER_EMAIL || "hello@ahmedghazi.com",
  //   to: destination,
  //   subject: "Your fonts :)",
  //   // html,
  //   templateId: "d-45468a3d093f4d6d9ab8a51d68de256f",
  //   dynamic_template_data: {
  //     subject: "Download Your fonts",
  //     destination: destination,
  //     download_link: payload,
  //   },
  // };
  // console.log(mail);
  // const res = await sendGridMail.send(mail);
  // // console.log(res);
  // console.log(`Email sent`);
  // return res;
};
// const _mutation = async (data: Podcast) => {
//   const client = createClient({
//     projectId: "5l8pdqi8",
//     dataset: "production",
//     token: process.env.SANITY_AUTH_TOKEN,
//     apiVersion: "2023-03-04",
//     useCdn: true,
//   });

//   const { title, url, author, text, tags } = data;

//   const mutations = [
//     {
//       createIfNotExists: {
//         // _id: `drafts.${uuidv4()}`,
//         _id: uuidv4(),
//         _type: "podcast",
//         title: title,
//         url: url,
//         author: author,
//         text: text,
//         tags: tags,
//         // {...data}
//       },
//     },
//   ];

//   const res = await client.mutate(mutations);
//   return res;
// };
