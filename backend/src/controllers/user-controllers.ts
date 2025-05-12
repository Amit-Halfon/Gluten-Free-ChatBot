import User from "../models/User.js";
import { NextFunction, Request, Response } from "express";

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
  // User signup
  try {
    // Get all users from database
    const email = req.auth.payload.email;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.send("User already exists");
    const { firstName, lastName } = req.auth.payload;
    const user = new User({ name: firstName, lastName, email });
    await user.save();

    return res
      .status(201)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const email = req.auth.payload.email;
    const name = req.auth.payload.name;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).send("User not registered Or Token Malfunction");
    }

    return res.status(200).json({ message: "OK", name: name, email: email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
