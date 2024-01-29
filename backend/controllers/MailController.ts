import { NextFunction, Request, Response } from "express";
import { sendEmail } from "../utils/Mailer/sendEmail";
import { VerifyAccountTemplate } from "../utils/Mailer/Templates/VerifyAccount";
import { ForgotPasswordTemplate } from "../utils/Mailer/Templates/ForgotPassword";
import Users from "../models/User";
import { WaybillTemplate } from "../utils/Mailer/Templates/Waybill";

export const VerifyPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fname, lname, email, emailToken } = req.body;
    if (!fname || !lname || !email || !emailToken) {
      res.status(404).json({ message: `Missing fields` });
    }
    const name = fname + " " + lname;
    const link = `http://localhost:8000/auth/verify/${emailToken}`;
    await sendEmail(email, "Verify Account", VerifyAccountTemplate(name, link));
    res.status(200).json({ message: "Verify Email sent" });
  } catch (err) {
    res.status(500).json({ error: "Failed to verify user" });
  }
};

export const ResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fname, lname, email, emailToken } = req.body;
    if (!fname || !lname || !email || !emailToken) {
      res.status(404).json({ message: `Missing fields` });
    }
    const name = fname + " " + lname;
    const link = `http://localhost:3000/reset/${emailToken}`;
    await sendEmail(
      email,
      "Reset password",
      ForgotPasswordTemplate(name, link)
    );
    res.status(200).json({ message: "Reset Email sent" });
  } catch (err) {
    res.status(500).json({ error: "Failed to reset user" });
  }
};

export const Waybill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { waybill, owner_id } = req.body;
    if (!waybill || !owner_id) {
      res.status(404).json({ message: `Missing fields` });
    }
    const findUser = await Users.findOne({ where: { user_id: owner_id } });

    if (!findUser) {
      res.status(404).json({ message: `User not found` });
    }
    const name = findUser?.fname + " " + findUser?.lname;
    const email = findUser?.email;
    await sendEmail(
      email || "",
      "Waybill Reciept",
      WaybillTemplate(name, waybill)
    );
    res.status(200).json({ message: "Waybill Email sent" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send waybill" });
  }
};
