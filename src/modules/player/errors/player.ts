import { ApiError } from "@shared/errors/api";

export namespace PlayerErrors {
  export class PlayerAlreadyExistsError extends ApiError {
    constructor() {
      const message = "Player already exists";

      super(message);
    }
  }

  export class PlayerNotExistsError extends ApiError {
    constructor() {
      const message = "Player not exists";

      const statusCode = 404;
      super(message, statusCode);
    }
  }
}
