import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  const transporter = nodemailer.createTransport({
    service: `${process.env.NEXT_PUBLIC_SMTP_HOST}`,
    auth: {
      user: `${process.env.NEXT_PUBLIC_SMTP_USER}`,
      pass: `${process.env.NEXT_PUBLIC_SMTP_PASS}`,
    },
  });

  const info = await transporter.sendMail({
    from: `"Your App Name" <asd>`,
    to,
    subject,
    text,
    html: html || text,
  });

  return info;
}
