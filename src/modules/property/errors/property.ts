import { ApiError } from "@shared/errors/api";

export namespace PropertyErrors {
  export class PropertyAlreadyExistsError extends ApiError {
    constructor() {
      const message = "Property already exists";

      super(message);
    }
  }

  export class CannotCreatePropertyWithInvalidSaleCostError extends ApiError {
    constructor() {
      const message = "'sale_cost' must be greater than 0";

      super(message);
    }
  }

  export class CannotCreatePropertyWithInvalidRentCostError extends ApiError {
    constructor() {
      const message = "'rent_cost' must be greater than 0";

      super(message);
    }
  }
}
