import { RequestHandler } from "express";

const auth: RequestHandler = async (req, res, next) => {
  res.send(req.body);
};

export default auth;
