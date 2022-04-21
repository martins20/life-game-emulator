import { ApiError } from "@shared/errors/api";

export namespace PlayerCategoryErrors {
  export class PlayerCategoryNameAlreadyExistsError extends ApiError {
    constructor() {
      const message = "Player type name already exists";

      super(message);
    }
  }
}
