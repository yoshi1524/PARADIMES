import nodemailer from "nodemailer";

/**
 * Sends real email via Gmail SMTP using Nodemailer, once you configure it.
 *
 * Setup (Gmail requires an App Password, not your normal login password):
 *   1. Turn on 2-Step Verification on the Gmail account you want to send
 *      from: https://myaccount.google.com/security
 *   2. Generate an App Password: https://myaccount.google.com/apppasswords
 *      (choose "Mail" as the app). Google gives you a 16-character code.
 *   3. In .env.local, set:
 *        GMAIL_USER=youraccount@gmail.com
 *        GMAIL_APP_PASSWORD=the16charactercode
 *
 * Until both are set, sendMail() logs to the console instead of sending —
 * so contact/inquiry forms keep working during setup, just without real
 * delivery yet.
 */

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }
  return transporter;
}

export type SendMailInput = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

export async function sendMail(input: SendMailInput): Promise<{ sent: boolean }> {
  const t = getTransporter();

  if (!t) {
    console.log("[mail:mock — GMAIL_USER/GMAIL_APP_PASSWORD not set]", input);
    return { sent: false };
  }

  await t.sendMail({
    from: `Parallel Dimensions <${process.env.GMAIL_USER}>`,
    to: input.to,
    subject: input.subject,
    text: input.text,
    replyTo: input.replyTo,
  });
  return { sent: true };
}
