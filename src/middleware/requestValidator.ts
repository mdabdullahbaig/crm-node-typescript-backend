import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import HttpError from "../utils/HttpError";

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body);

      // Just for reference
      // const validatedBody = await schema.validate(req.body);
      //   req.body = validatedBody;
      //   await schema.validate({
      //     body: req.body,
      //     query: req.query,
      //     params: req.params,
      //   });
      next();
    } catch (err: any) {
      next(HttpError.BadRequest(err.message));
    }
  };

export default validate;
