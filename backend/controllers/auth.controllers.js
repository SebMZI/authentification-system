import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signup = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { firstName, lastName, email, username, password } = req.body;

    const emailAlreadyUsed = await User.findOne({ email });
    const uernameAlreadyUsed = await User.findOne({ username });

    if (emailAlreadyUsed) {
      const error = new Error("Email already exists");
      error.status = 409;
      throw error;
    }

    if (uernameAlreadyUsed) {
      const error = new Error("Username already exists");
      error.status = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const users = await User.create(
      [{ firstName, lastName, email, username, password: hashedPassword }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    const token = jwt.sign({ userId: users[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      samesite: "strict",
    });

    res.status(201).json({
      success: true,
      message: "User successfully created",
      data: {
        token,
        user: users[0],
      },
    });
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signin = async (req, res, next) => {};
