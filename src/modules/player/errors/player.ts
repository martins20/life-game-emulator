import { ApiError } from "@shared/errors/api";

export namespace PlayerErrors {
  export class PlayerAlreadyExistsError extends ApiError {
    constructor(message = "Player already exists") {
      super(message);
    }
  }
}
