import { BoardErrors } from "./board";

describe("BoardErrors", () => {
  it("Should to return a error message 'Cannot create board without players.' status code equals to 400", () => {
    try {
      throw new BoardErrors.CannotCreateBoardWithoutPlayersError();
    } catch (error: any) {
      expect(error.message).toBe("Cannot create board without players.");
      expect(error.statusCode).toBe(400);
    }
  });
});
