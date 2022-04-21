import { ApiError } from "@shared/errors/api";

export namespace PlayerTypeErrors {
  export class PlayerTypeNameAlreadyExistsError extends ApiError {
    constructor() {
      const message = "Player type name already exists";

      super(message);
    }
  }
}
