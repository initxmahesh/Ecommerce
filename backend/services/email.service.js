import nodemailer from "nodemailer";
import env from "../config/env.js";
import logger from "../utils/logger.js";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  if (!env.email.host || !env.email.user) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host: env.email.host,
    port: env.email.port,
    secure: env.email.secure,
    auth: {
      user: env.email.user,
      pass: env.email.pass,
    },
  });

  return transporter;
}

export async function sendVerificationEmail({ to, firstName, token }) {
  const verifyUrl = `${env.clientUrl}/verify-email?token=${token}`;

  const html = `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
      <h2>Verify your email</h2>
      <p>Hi ${firstName},</p>
      <p>Thanks for signing up for VendorFlow. Click the button below to verify your email address.</p>
      <a href="${verifyUrl}" style="display: inline-block; padding: 12px 24px; background: #1a2b3c; color: #fff; text-decoration: none; border-radius: 8px;">
        Verify email
      </a>
      <p style="margin-top: 24px; color: #666; font-size: 14px;">
        Or copy this link: ${verifyUrl}
      </p>
      <p style="color: #666; font-size: 14px;">This link expires in 24 hours.</p>
    </div>
  `;

  const mailOptions = {
    from: env.email.from,
    to,
    subject: "Verify your VendorFlow account",
    html,
  };

  const transport = getTransporter();

  if (!transport) {
    logger.info("Email not configured — verification link logged", { to, verifyUrl });
    return { sent: false, verifyUrl };
  }

  await transport.sendMail(mailOptions);
  return { sent: true };
}
