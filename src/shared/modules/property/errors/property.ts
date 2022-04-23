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

  export class PropertyNotExistsError extends ApiError {
    constructor() {
      const message = "Property not exists";
      const statusCode = 404;

      super(message, statusCode);
    }
  }

  export class PropertyAlreadyHasOwnerError extends ApiError {
    constructor() {
      const message = "Property already has owner";

      super(message);
    }
  }

  export class PropertiesNotExistsError extends ApiError {
    constructor(property_ids: string[]) {
      const message = `Properties [${property_ids}] not exists`;

      const statusCode = 404;
      super(message, statusCode);
    }
  }
}
