import { ApiError } from "@shared/errors/api";

export namespace PropertyErrors {
  export class PropertyAlreadyExistsError extends ApiError {
    constructor() {
      const message = "Property already exists";

      super(message);
    }
  }
}
