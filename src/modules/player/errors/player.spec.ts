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
});
