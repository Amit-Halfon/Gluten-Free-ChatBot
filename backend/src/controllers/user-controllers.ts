import User from "../models/User.js";
import { NextFunction, Request, Response } from "express";
import { hash } from "bcrypt";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get all users
  try {
    //get all users from database
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //user signup
  try {
    //get all users from database
    const { name, lastName, email, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, lastName, email, password: hashedPassword });
    await user.save();
    return res.status(201).json({ message: "OK", id: user._id.toString() });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //user login
  try {
    //get all users from database
    const { email, password } = req.body;
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
