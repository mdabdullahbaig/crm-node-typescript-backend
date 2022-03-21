import { RequestHandler } from "express";
import User, { IUser } from "../model/user";
import HttpError from "../utils/HttpError";

export const createUser: RequestHandler = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body as IUser;

  let existedUser;

  try {
    existedUser = await User.findOne({ email });
  } catch (err: any) {
    next(HttpError.InternalServerError(err.message));
  }

  if (existedUser) {
    return next(
      new HttpError(200, "User already exist, Please login instead.")
    );
  }

  const user = new User({
    firstName,
    lastName,
    email,
    password,
  });

  try {
    await user.save();
  } catch (err: any) {
    return next(HttpError.InternalServerError(err.message));
  }

  res.status(201).json({
    message: "Your account has been successfully created. ",
  });
};

export const getUserByEmail: RequestHandler = async (req, res, next) => {};

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    return next();
  } catch (error) {}
  res.send("Hello Mr.");
};

export const updateUserById: RequestHandler = async (req, res, next) => {};

export const deleteUserById: RequestHandler = async (req, res, next) => {};
