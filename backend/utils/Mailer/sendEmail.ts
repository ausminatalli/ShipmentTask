import * as nodemailer from "nodemailer";
const dotenv = require("dotenv");

dotenv.config({ path: ".env.example" });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  debug: true,
  auth: {
    user: process.env.NOREPLY_EMAIL,
    pass: process.env.NOREPLY_Password,
  },
});

// Function to send an email
export const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string
): Promise<boolean> => {
  try {
    const info = await transporter.sendMail({
      from: process.env.NOREPLY_EMAIL,
      to,
      subject,
      html: htmlContent,
    });

    return true;
  } catch (error) {
    return false;
  }
};
