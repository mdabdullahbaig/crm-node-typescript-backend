import { RequestHandler } from "express";
import User, { IUser, IUserDocument } from "../model/user";
import HttpError from "../utils/HttpError";

export const createUser: RequestHandler = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body as IUser;

  let existedUser;

  try {
    existedUser = (await User.findOne({ email })) as IUserDocument;
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
    next(HttpError.BadRequest(err.message));
  }

  res.status(201).json({
    message: "Your account has been successfully created. ",
  });
};

export const getUserByEmail: RequestHandler = async (req, res, next) => {};

export const getUsers: RequestHandler = async (req, res, next) => {
  let users;

  try {
    users = (await User.find({})) as IUserDocument[];
  } catch (err: any) {
    return next(HttpError.InternalServerError(err.message));
  }

  if (users.length < 1) {
    return next(HttpError.NotFound());
  }

  res.status(200).json(users);
};

export const updateUserById: RequestHandler = async (req, res, next) => {
  const id = req.params.id as string;
  const updates = Object.keys(req.body);

  let existedUser: any;
  try {
    existedUser = (await User.findById(id)) as IUserDocument;
  } catch (err: any) {
    return next(HttpError.InternalServerError(err.message));
  }

  if (!existedUser) {
    return next(HttpError.NotFound());
  }

  updates.forEach((update) => (existedUser[update] = req.body[update]));

  try {
    await existedUser.save();
  } catch (err: any) {
    next(HttpError.BadRequest(err.message));
  }

  res.status(200).json(existedUser);
};

export const deleteUserById: RequestHandler = async (req, res, next) => {
  const id = req.params.id as string;

  let existedUser;
  try {
    existedUser = (await User.findById(id)) as IUserDocument;
  } catch (err: any) {
    return next(HttpError.InternalServerError(err.message));
  }

  if (!existedUser) {
    return next(HttpError.NotFound());
  }

  try {
    existedUser.remove();
  } catch (err: any) {
    next(HttpError.BadRequest(err.message));
  }

  res.status(200).json({ message: "User successfully deleted." });
};
