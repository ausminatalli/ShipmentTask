import { NextFunction, Request, Response } from "express";
import Users from "../models/User";
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await Users.findAll();
  return res.status(200).json(users);
  } catch (err) {
  return res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const addUser = async (
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
    const user = await Users.create({
      fname,
      lname,
      email,
      password,
      dateofbirth,
      mobilenumber,
    });

   return res.status(201).json(user);
  } catch (error) {
   return res.status(500).json({ error: `Failed to add user ${error}` });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const { fname, lname, dateofbirth, mobilenumber } = req.body;
    if (!fname || !lname || !dateofbirth || !mobilenumber) {
    return res.status(404).json({ message: `Missing fields` });
    }
    const updatedUser = await Users.update(req.body, {
      where: { user_id: userId },
    });

   return res.status(200).json(updatedUser);
  } catch (err) {
   return res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;

    await Users.destroy({ where: { user_id: userId } });

   return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
  return res.status(500).json({ error: "Failed to delete user" });
  }
};

export const filterUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await req.body;

  try {
    const whereClause: any = {};
    if (data.email) {
      whereClause.email = data.email.trim();
    }

    if (data.mobilenumber) {
      whereClause.mobilenumber = data.mobilenumber;
    }

    const filteredData = await Users.findAll({
      where: whereClause,
    });
   return res.status(200).json(filteredData);
  } catch (error) {
   return res.status(500).json({ message: "Something went wrong" });
  }
};
