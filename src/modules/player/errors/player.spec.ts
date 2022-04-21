import { PlayerErrors } from "./player";

describe("PlayerErrors", () => {
  it("Should to return a error message 'Player already exists' status code equals to 400", () => {
    try {
      throw new PlayerErrors.PlayerAlreadyExistsError();
    } catch (error: any) {
      expect(error.message).toBe("Player already exists");
      expect(error.statusCode).toBe(400);
    }
  });

  it("Should to return a error message 'Player not exists' status code equals to 404", () => {
    try {
      throw new PlayerErrors.PlayerNotExistsError();
    } catch (error: any) {
      expect(error.message).toBe("Player not exists");
      expect(error.statusCode).toBe(404);
    }
  });

  it("Should to return a error message 'Player name is required' status code equals to 400", () => {
    try {
      throw new PlayerErrors.PlayerNameIsRequiredError();
    } catch (error: any) {
      expect(error.message).toBe("Player name is required");
      expect(error.statusCode).toBe(400);
    }
  });
});
