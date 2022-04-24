import { Request, Response, NextFunction } from "express";

import { ApiError } from "@shared/errors/api";
import { ApiErrors } from "@shared/errors";

export default class HandleErrorsMiddleware {
  private static INSTANCE: HandleErrorsMiddleware;

  private constructor() {}

  static getInstance(): HandleErrorsMiddleware {
    if (HandleErrorsMiddleware.INSTANCE === undefined) {
      HandleErrorsMiddleware.INSTANCE = new HandleErrorsMiddleware();
    }

    return HandleErrorsMiddleware.INSTANCE;
  }

  execute(error: Error, _: Request, response: Response, __: NextFunction) {
    if (error instanceof ApiError) {
      const { message, statusCode } = error;

      return response.status(statusCode).json({
        message,
      });
    }

    console.error(error);

    const { statusCode, message } = new ApiErrors.InternalServerError(
      error.message
    );

    return response.status(statusCode).json({
      message,
    });
  }
}
