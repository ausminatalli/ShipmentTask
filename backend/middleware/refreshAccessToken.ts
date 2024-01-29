import { Response } from "express";
import * as jwt from "jsonwebtoken";
const refreshAccessToken = async (
  req: {
    cookies: { access_token: string; refresh_token: string };
    user?: { id: string; isAdmin: boolean } | jwt.JwtPayload | any;
  },
  res: Response
) => {
  return new Promise<string | undefined>(async (resolve) => {
    const refreshToken = req.cookies.refresh_token;
    
    if (!refreshToken) {
      resolve(undefined);
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT || "");
      req.user = decoded;

      const newAccessToken = jwt.sign(
        { id: req.user.id, isAdmin: req.user.isAdmin },
        process.env.JWT || "",
        { expiresIn: "1m" }
      );

      res.cookie("access_token", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60000,
      });

      resolve(newAccessToken);
    } catch (error) {
      resolve(undefined);
    }
  });
};

export default refreshAccessToken;
