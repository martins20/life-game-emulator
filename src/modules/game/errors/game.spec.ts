import { GameErrors } from "./game";

describe("GameErrors", () => {
  it("Should to return a error message 'Cannot create game without a board.' status code equals to 400", () => {
    try {
      throw new GameErrors.CannotCreateGameWithoutBoardError();
    } catch (error: any) {
      expect(error.message).toBe("Cannot create game without a board.");
      expect(error.statusCode).toBe(400);
    }
  });

  it("Should to return a error message 'Game not exists.' status code equals to 404", () => {
    try {
      throw new GameErrors.GameNotExistsError();
    } catch (error: any) {
      expect(error.message).toBe("Game not exists.");
      expect(error.statusCode).toBe(404);
    }
  });

  it("Should to return a error message 'Cannot simulate a finished game.' status code equals to 400", () => {
    try {
      throw new GameErrors.CannotSimulateFinishedGameError();
    } catch (error: any) {
      expect(error.message).toBe("Cannot simulate a finished game.");
      expect(error.statusCode).toBe(400);
    }
  });
});
