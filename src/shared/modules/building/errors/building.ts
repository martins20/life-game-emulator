import { ApiError } from "@shared/errors/api";

export namespace BuildingErrors {
  export class BuildingAlreadyExistsError extends ApiError {
    constructor() {
      const message = "Building already exists";

      super(message);
    }
  }

  export class CannotCreateBuildingWithInvalidSaleCostError extends ApiError {
    constructor() {
      const message = "'sale_cost' must be greater than 0";

      super(message);
    }
  }

  export class CannotCreateBuildingWithInvalidRentCostError extends ApiError {
    constructor() {
      const message = "'rent_cost' must be greater than 0";

      super(message);
    }
  }

  export class BuildingNotExistsError extends ApiError {
    constructor() {
      const message = "Building not exists";
      const statusCode = 404;

      super(message, statusCode);
    }
  }

  export class BuildingAlreadyHasOwnerError extends ApiError {
    constructor() {
      const message = "Building already has owner";

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
