import { GameErrors } from "./game";

describe("GameErrors", () => {
  it("Should to return a error message 'Cannot create game without players.' status code equals to 400", () => {
    try {
      throw new GameErrors.CannotCreateGameWithoutBoardError();
    } catch (error: any) {
      expect(error.message).toBe("Cannot create game without a board.");
      expect(error.statusCode).toBe(400);
    }
  });
});
