import { ApiError } from "@shared/errors/api";

export namespace GameErrors {
  export class CannotCreateGameWithoutBoardError extends ApiError {
    constructor() {
      const message = "Cannot create game without a board.";

      super(message);
    }
  }

  export class GameNotExistsError extends ApiError {
    constructor() {
      const message = "Game not exists.";
      const statusCode = 404;

      super(message, statusCode);
    }
  }

  export class CannotSimulateFinishedGameError extends ApiError {
    constructor() {
      const message = "Cannot simulate a finished game.";

      super(message);
    }
  }
}
