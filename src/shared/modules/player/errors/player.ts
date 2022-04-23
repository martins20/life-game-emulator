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

  export class PlayersNotExistsError extends ApiError {
    constructor(player_ids: string[]) {
      const message = `Players [${player_ids}] not exists`;

      const statusCode = 404;
      super(message, statusCode);
    }
  }

  export class PlayerNameIsRequiredError extends ApiError {
    constructor() {
      const message = "Player name is required";

      super(message);
    }
  }

  export class StepsMustBeGreaterOrEqualToZeroError extends ApiError {
    constructor() {
      const message = "Steps must be greater or equal to 0";

      super(message);
    }
  }
}
