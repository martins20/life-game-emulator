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

  it("Should to return a error message 'Cannot create board without buildings.' status code equals to 400", () => {
    try {
      throw new BoardErrors.CannotCreateBoardWithoutBuildingsError();
    } catch (error: any) {
      expect(error.message).toBe("Cannot create board without buildings.");
      expect(error.statusCode).toBe(400);
    }
  });
});
