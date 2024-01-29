import { NextFunction, Request, Response } from "express";
import Users from "../models/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { generateEmailToken } from "../utils/generateEmailToken";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;
    const pass = req.body.password;

    if (!email) return next(res.status(404).json({ message: "Email missing" }));

    if (!pass)
      return next(res.status(404).json({ message: "Password missing" }));

    const existingEmail = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (!existingEmail)
      return next(res.status(404).json({ message: "User not registered" }));

    const isPasswordCorrect = await bcrypt.compare(
      pass,
      existingEmail.password
    );
    if (!isPasswordCorrect)
      return next(
        res.status(400).json({ message: "Invalid email or password" })
      );
    if (!existingEmail.isVerified)
      return next(res.status(400).json({ message: "User not verified" }));

    //signing access and refresh token
    const token = jwt.sign(
      { id: existingEmail.user_id, isAdmin: existingEmail.isAdmin },
      process.env.JWT ? process.env.JWT : "",
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: existingEmail.user_id, isAdmin: existingEmail.isAdmin },
      process.env.JWT ? process.env.JWT : "",
      { expiresIn: "2d" }
    );

    //setting the tokens via httpOnly Cookies

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 900000, // 15 minute
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({ existingEmail, message: "Login Success" });
  } catch (error) {
    return next(res.status(500).json({ message: `Failed to Login,${error}` }));
  }
};

export const Register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fname, lname, email, password, dateofbirth, mobilenumber } =
      req.body;

    if (
      !fname ||
      !lname ||
      !email ||
      !password ||
      !dateofbirth ||
      !mobilenumber
    ) {
      return res.status(404).json({ message: `Missing fields` });
    }
    const existingEmail = await Users.findOne({ where: { email: email } });

    if (existingEmail?.email) {
      return res.status(401).json({ message: `Email Already registered` });
    }
    const user = await Users.create({
      fname,
      lname,
      email,
      password,
      dateofbirth,
      mobilenumber,
      emailToken: generateEmailToken(),
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.clearCookie("refresh_token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  return res.status(200).json({ message: "Logout Success" });
};

export const getUserInfoFromToken = (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token not found" });
    }

    // Decode the refreshToken to get user data
    const decodedData = jwt.verify(
      refreshToken,
      process.env.JWT ? process.env.JWT : ""
    ) as {
      isAdmin: boolean;
      id: string;
    };

    const response: any = {
      isAdmin: decodedData.isAdmin,
      id: decodedData.id,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const Verify = async (req: Request, res: Response) => {
  try {
    const Client_url = process.env.Client_url as string;
    const emailToken = req.params.emailToken;
    if (!emailToken) {
      res.status(404).json({ message: `Link Not supported` });
    }
    const findUser = await Users.findOne({ where: { emailToken: emailToken } });

    if (findUser) {
      if (findUser.user_id) {
        await Users.update(
          { isVerified: true, emailToken: "" },
          { where: { user_id: findUser.user_id } }
        );
        return res.redirect(Client_url);
      }
    } else {
      return res.status(404).json({ message: "Link Not supported" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Failed to verify user" });
  }
};

export const ForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(404).json({ message: `Missing fields` });
    }
    const findUser = await Users.findOne({ where: { email: email } });

    if (!findUser) {
      return res.status(404).json({ message: "Email not registered" });
    }
    findUser.emailToken = generateEmailToken();

    findUser.save();
    return res.status(200).json(findUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const CheckResetToken = async (req: Request, res: Response) => {
  try {
    const emailToken = req.params.emailToken;
    if (!emailToken) {
      return res.status(404).json({ message: `Link Not supported` });
    }
    const findUser = await Users.findOne({ where: { emailToken: emailToken } });

    if (findUser) {
      return res.status(200).json(findUser);
    } else {
      return res.status(404).json({ message: "Token expired" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Failed to verify user" });
  }
};

export const ResetPassword = async (req: Request, res: Response) => {
  try {
    const emailToken = req.params.emailToken;
    const { password } = req.body;
    if (!emailToken) {
      return res.status(404).json({ message: `Link Not supported` });
    }
    const findUser = await Users.findOne({ where: { emailToken: emailToken } });
    if (findUser) {
      findUser.password = await bcrypt.hash(password, 10);
      findUser.emailToken = "";
      findUser.save();
      return res.status(200).json(findUser);
    } else {
      return res.status(404).json({ message: "Token expired" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Failed to verify user" });
  }
};
