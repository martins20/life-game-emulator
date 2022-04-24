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

  it("Should to return a error message 'Cannot simulate a game with one player.' status code equals to 400", () => {
    try {
      throw new GameErrors.CannotSimulateGameWithOnePlayer();
    } catch (error: any) {
      expect(error.message).toBe("Cannot simulate a game with one player.");
      expect(error.statusCode).toBe(400);
    }
  });
});
