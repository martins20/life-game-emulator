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

  it("Should to return a error message 'Cannot create board with players [player_id_1, player_id_2] without a category.' status code equals to 400", () => {
    try {
      throw new BoardErrors.CannotCreateBoardWithPlayerWithoutCategoryError([
        "player_id_1",
        "player_id_2",
      ]);
    } catch (error: any) {
      expect(error.message).toBe(
        "Cannot create board with players [player_id_1,player_id_2] without a category."
      );
      expect(error.statusCode).toBe(400);
    }
  });

  it("Should to return a error message 'Cannot create board with just one player.' status code equals to 400", () => {
    try {
      throw new BoardErrors.CannotCreateBoardWithOnePlayerError();
    } catch (error: any) {
      expect(error.message).toBe("Cannot create board with just one player.");
      expect(error.statusCode).toBe(400);
    }
  });

  it("Should to return a error message 'Board must have 20 builds quantity.' status code equals to 400", () => {
    try {
      throw new BoardErrors.BoardMustHaveMaxBuildingsError(20);
    } catch (error: any) {
      expect(error.message).toBe("Board must have 20 builds quantity.");
      expect(error.statusCode).toBe(400);
    }
  });
});
