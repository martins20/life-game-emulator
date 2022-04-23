import { ApiError } from "@shared/errors/api";

export namespace BoardErrors {
  export class CannotCreateBoardWithoutPlayersError extends ApiError {
    constructor() {
      const message = "Cannot create board without players.";

      super(message);
    }
  }
}
