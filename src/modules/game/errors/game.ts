import { ApiError } from "@shared/errors/api";

export namespace GameErrors {
  export class CannotCreateGameWithoutBoardError extends ApiError {
    constructor() {
      const message = "Cannot create game without a board.";

      super(message);
    }
  }
}
