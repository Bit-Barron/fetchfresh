import nodemailer from "nodemailer";
import { serverEnv } from "@/utils/env/server";

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "lolha6773@gmail.com",
      pass: "pdaevixqohhzzntc",
    },
  });

  const info = await transporter.sendMail({
    from: `"Your App Name" <asd>`,
    to,
    subject,
    text,
    html: html || text,
  });

  console.log("Message sent: %s", info.messageId);

  return info;
}
