'use server';
import nodemailer from 'nodemailer';
const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: false,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

export async function sendMail({
  name,
  email,
  type,
  message,
}: {
  name: string;
  email: string;
  type: string;
  message: string;
}) {
  try {
    await transporter.verify();
  } catch (error) {
    console.error('❌ Transporter verification failed:', error);
    return { success: false };
  }

  const mailText = `📬 New submission from Resuma\n\n🧑 Name: ${name}\n✉️ Email: ${email}\n📝 Type: ${type}\n\n💬 Message:\n${message}`;

  const info = await transporter.sendMail({
    from: email,
    to: SMTP_SERVER_USERNAME,
    subject: `New ${type} from ${name}`,
    text: mailText,
  });

  return { success: true, messageId: info.messageId };
}