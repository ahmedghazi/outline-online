import { NextRequest, NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";
// import { Podcast } from "@/app/types/schema";
import nodemailer from "nodemailer";

require("dotenv").config();

export async function POST(request: Request, res: Response) {
  console.log("SENDER_EMAIL", process.env.SENDER_EMAIL);
  if (request.method !== "POST") {
    // res.status(405).json({ message: "INVALID_METHOD" });
    // return;
    return new NextResponse(JSON.stringify({ message: "INVALID_METHOD" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const body = await request.json(); // res now contains body
    // console.log(body);

    const result = await _send(body.data);
    // const json = await result.json();
    const json_response = {
      // message: "success",
      data: JSON.stringify(result),
    };
    console.log(json_response);
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
const _send = async (body: any) => {
  // console.log(body);
  console.log(process.env.SENDER_EMAIL, process.env.SENDER_PASSWORD);
  // return data;

  // const transporter = nodemailer.createTransport({
  //   port: 465,
  //   host: "smtp.gmail.com",
  //   auth: {
  //     user: process.env.SENDER_EMAIL,
  //     pass: process.env.SENDER_PASSWORD,
  //   },
  //   secure: true,
  // });
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
    secure: true,
  });

  var mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: "hello@ahmedghazi.com",
    subject: "Contact depuis le site",
    text: "test",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error(error);
    } else {
      console.log("Email Sent");
      return true;
    }
  });

  // // Donner la clé API
  // sgMail.setApiKey(process.env.KEY_SENDGRID);
  // // Création du message
  // const sendGridMail = {
  // 	to: "hello@believemy.com",
  // 	from: "louisnicolas@believemy.com",
  // 	templateId: "d-98ac3ceded9745448d3f4522a0f3eb26",
  // 	dynamic_template_data: {
  // 		prenom: prenom,
  // 		nom: nom,
  // 		email: email,
  // 		contenu: message,
  // 	},
  // };
  // const res = await sgMail.send(sendGridMail);
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
