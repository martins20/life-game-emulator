import { ApiError } from "@shared/errors/api";

export namespace PlayerCategoryErrors {
  export class PlayerCategoryNameAlreadyExistsError extends ApiError {
    constructor() {
      const message = "Player category name already exists";

      super(message);
    }
  }

  export class PlayerCategoryNotExistsError extends ApiError {
    constructor() {
      const message = "Player category not exists";
      const statusCode = 404;

      super(message, statusCode);
    }
  }
}
