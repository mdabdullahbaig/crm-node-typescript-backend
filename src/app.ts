import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response, NextFunction } from "express";
import logger from "./utils/logger";
import { errorHandler } from "./middleware/errorHandler";
import userRoute from "./route/userRoute";
import authRoute from "./route/authRoute";
import leadRoute from "./route/leadRoute";
import mongoose from "mongoose";
import HttpError from "./utils/HttpError";

const app: Application = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL as string;

// Application Level Middleware
// Parsing incoming request as json or urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Level Middleware
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/leads", leadRoute);

// Route Not Match Handling Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  next(HttpError.NotFound("Route Not Found"));
});

// Error Handling Middleware
app.use(errorHandler);

mongoose
  .connect(DB_URL)
  .then(() => {
    logger.info("Database is connected successfully!");
    app.listen(PORT, () => {
      logger.info(`App is listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(err);
  });
