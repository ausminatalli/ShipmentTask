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
    const Server_url = process.env.Server_url;

    if (!fname || !lname || !email || !emailToken) {
      res.status(404).json({ message: `Missing fields` });
    }
    const name = fname + " " + lname;
    const link = `${Server_url}/auth/verify/${emailToken}`;
    await sendEmail(email, "Verify Account", VerifyAccountTemplate(name, link));
    return res.status(200).json({ message: "Verify Email sent" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to verify user" });
  }
};

export const ResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fname, lname, email, emailToken } = req.body;
    const Client_url = process.env.Client_url;

    if (!fname || !lname || !email || !emailToken) {
      return res.status(404).json({ message: `Missing fields` });
    }
    const name = fname + " " + lname;
    const link = `${Client_url}/reset/${emailToken}`;
    await sendEmail(
      email,
      "Reset password",
      ForgotPasswordTemplate(name, link)
    );
    return res.status(200).json({ message: "Reset Email sent" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to reset user" });
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
      return res.status(404).json({ message: `User not found` });
    }
    const name = findUser?.fname + " " + findUser?.lname;
    const email = findUser?.email;
    await sendEmail(
      email || "",
      "Waybill Reciept",
      WaybillTemplate(name, waybill)
    );
    return res.status(200).json({ message: "Waybill Email sent" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to send waybill" });
  }
};
