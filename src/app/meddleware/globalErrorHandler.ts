import { ErrorRequestHandler } from "express";
import handelZodError from "../error/handleZodError";
import { ZodError } from "zod";
import handleValidationError from "../error/handleValidationError";
import handleCastError from "../error/handleCastError";
import handleDuplicateError from "../error/handleDuplicateError";
import AppError from "../error/AppError";
import config from "../config";

export type TErrorSources = {
  path: string | number;
  message: string;
}[];

const globalErrorHandaler: ErrorRequestHandler = async (error, req, res) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];
  console.log(error);
  if (error instanceof ZodError) {
    const simplifedError = handelZodError(error);
    statusCode = simplifedError?.statusCode;
    message = simplifedError?.message;
    errorSources = simplifedError?.errorSources;
  } else if (error?.name === "ValidationError") {
    const simplifedError = handleValidationError(error);
    statusCode = simplifedError?.statusCode;
    message = simplifedError?.message;
    errorSources = simplifedError?.errorSources;
  } else if (error?.name === "CastError") {
    const simplifedError = handleCastError(error);
    statusCode = simplifedError?.statusCode;
    message = simplifedError?.message;
    errorSources = simplifedError?.errorSources;
  } else if (error.code === 11000) {
    const simplifedError = handleDuplicateError(error);
    statusCode = simplifedError?.statusCode || 500;
    message = simplifedError?.message;
    errorSources = simplifedError?.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error?.message;
    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === "development" ? error?.stack : null,
  });
};

export default globalErrorHandaler;
