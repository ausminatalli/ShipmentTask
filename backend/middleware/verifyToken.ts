import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import refreshAccessToken from "./refreshAccessToken";
//Check Token
const verifyToken = async (
  req: {
    cookies: { access_token: string; refresh_token: string };
    user?: string | jwt.JwtPayload | any;
  },
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;
  if (!accessToken) {
    if (refreshToken) {
      const newAccessToken = await refreshAccessToken(req, res);
      if (newAccessToken) {
        req.cookies.access_token = newAccessToken;
        return next();
      }
    }
    // return res.status(401).json({ message: "You are not authenticated!" });
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT || "");
    req.user = decoded;
    next();
  } catch (error) {
    return next();
  }
};

export const verifyAdmin = async (
  req: {
    cookies: { access_token: string; refresh_token: string };
    user?: { id: number; isAdmin: boolean } | jwt.JwtPayload | any;
  },
  res: Response,
  next: NextFunction
) => {
  try {
    verifyToken(req, res, async () => {
      if (!req.user && !req.user.isAdmin) {
        return next(
          res.status(403).json({ message: "You are not authenticated!" })
        );
      } else {
        next();
      }
    });
  } catch (error) {
    return next(res.status(500).json({ message: "Something went wrong" }));
  }
};

export const verifyUser = async (
  req: {
    cookies: { access_token: string; refresh_token: string };
    user?: { id: number; isAdmin: boolean } | jwt.JwtPayload | any;
  },
  res: Response,
  next: NextFunction
) => {
  try {
    verifyToken(req, res, async () => {
      if (!req.user) {
        return next(
          res.status(403).json({ message: "You are not authenticated!" })
        );
      } else {
        next();
      }
    });
  } catch (error) {
    return next(res.status(500).json({ message: "Something went wrong" }));
  }
};
