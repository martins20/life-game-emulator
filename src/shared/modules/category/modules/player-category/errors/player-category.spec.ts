import { PlayerCategoryErrors } from "./player-category";

describe("PlayerCategoryErrors", () => {
  it("Should to return a error message 'Player category name already exists' status code equals to 400", () => {
    try {
      throw new PlayerCategoryErrors.PlayerCategoryNameAlreadyExistsError();
    } catch (error: any) {
      expect(error.message).toBe("Player category name already exists");
      expect(error.statusCode).toBe(400);
    }
  });

  it("Should to return a error message 'Player not exists' status code equals to 404", () => {
    try {
      throw new PlayerCategoryErrors.PlayerCategoryNotExistsError();
    } catch (error: any) {
      expect(error.message).toBe("Player category not exists");
      expect(error.statusCode).toBe(404);
    }
  });
});
