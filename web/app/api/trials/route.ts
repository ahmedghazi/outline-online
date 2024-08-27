import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import sendGridMail from "@sendgrid/mail";
// import dotenv from "dotenv";

// require("dotenv").config();

import sanityClient from "@sanity/client";
import { Style, Typeface } from "@/app/types/schema";

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2021-08-29",
  useCdn: true,
  withCredentials: true,
  token: process.env.SANITY_API_READ_TOKEN,
});

type SendProps = {
  payload: any;
  destination: string;
};

export async function POST(req: NextRequest, res: NextApiResponse) {
  console.log("SENDER_EMAIL", process.env.SENDER_EMAIL);
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
    const { clientInfos, typefacesId } = data;
    const destination = clientInfos.email;

    const zipFiles = await _collectTypefacesZip(typefacesId);
    const _downloadButtons = await _generateDownloadButtons(zipFiles);
    console.log("zipFiles");
    console.log(zipFiles);
    // console.log(data);

    // const params: SendProps = {
    //   payload: zipFiles,
    //   destination: destination,
    // };
    // const _sendEmailresult = await _sendEmail(params);

    const json_response = {
      // message: "success",
      data: JSON.stringify(_downloadButtons),
    };
    // console.log(json_response);
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.log(error);
    const error_response = {
      status: "error",
      message: error.message,
      raw: error,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

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
  // const data = await res.json();
  // console.log(res);
  return res;
};

const _generateDownloadButtons = (items: any) => {
  return items.map((item: Typeface) => {
    if (item.zip) {
      return `<a href="${item.zip.asset.url}">${item.title} - ${item.style}</a>`;
    } else {
      return "no zip found";
    }
  });
};

const _sendEmail = async ({ destination, payload }: SendProps) => {
  sendGridMail.setApiKey(process.env.SENDGRID_API_KEY || "");
  console.log("_sending to :", destination);
  const str = JSON.stringify(payload);
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
  const mail = {
    from: process.env.SENDER_EMAIL || "hello@ahmedghazi.com",
    to: destination,
    subject: "Your fonts :)",
    // html,
    templateId: "d-45468a3d093f4d6d9ab8a51d68de256f",
    dynamic_template_data: {
      subject: "Download Your fonts",
      destination: destination,
      download_link: payload,
    },
  };
  console.log(mail);
  const res = await sendGridMail.send(mail);
  // console.log(res);
  console.log(`Email sent`);
  return res;
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
