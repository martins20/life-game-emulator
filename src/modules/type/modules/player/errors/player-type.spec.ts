import { PlayerTypeErrors } from "./player-type";

describe("PlayerTypeErrors", () => {
  it("Should to return a error message 'Player type already exists' status code equals to 400", () => {
    try {
      throw new PlayerTypeErrors.PlayerTypeNameAlreadyExistsError();
    } catch (error: any) {
      expect(error.message).toBe("Player type name already exists");
      expect(error.statusCode).toBe(400);
    }
  });
});
