import { ApiError } from "@shared/errors/api";

export namespace ApiErrors {
  export class InternalServerError extends ApiError {
    constructor(message: string, statusCode = 500) {
      super(`${message}`, statusCode);
    }
  }
}
