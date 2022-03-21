import { Request, Response, NextFunction } from "express";
import HttpError from "../utils/HttpError";

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500);
  res.json({ message: err.message || "Something went wrong." });
};
