import nodemailer from "nodemailer";

const user = process.env.EMAIL_ADDRESS;
const pass = process.env.EMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth: { user, pass },
});

async function sendEmail(email: string, subject: string, body: string) {
  try {
    const message = {
      to: email,
      from: user,
      subject: subject,
      html: body,
    };
    await transporter
      .sendMail(message)
      .then((res) => {})
      .catch((err) => {
        throw err;
      });
    return message;
  } catch (error) {
    throw error;
  }
}

export default sendEmail;
