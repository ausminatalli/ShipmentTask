import * as nodemailer from "nodemailer";
const dotenv = require("dotenv");

dotenv.config({ path: ".env.example" });

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
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
