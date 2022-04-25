import { ApiError } from "@shared/errors/api";

export namespace BoardErrors {
  export class CannotCreateBoardWithoutPlayersError extends ApiError {
    constructor() {
      const message = "Cannot create board without players.";

      super(message);
    }
  }

  export class CannotCreateBoardWithOnePlayerError extends ApiError {
    constructor() {
      const message = "Cannot create board with just one player.";

      super(message);
    }
  }

  export class CannotCreateBoardWithoutBuildingsError extends ApiError {
    constructor() {
      const message = "Cannot create board without buildings.";

      super(message);
    }
  }

  export class BoardNotExistsError extends ApiError {
    constructor() {
      const message = "Board not Exists.";
      const statusCode = 404;

      super(message, statusCode);
    }
  }

  export class CannotCreateBoardWithPlayerWithoutCategoryError extends ApiError {
    constructor(player_ids: string[]) {
      const message = `Cannot create board with players [${player_ids}] without a category.`;

      super(message);
    }
  }
}
