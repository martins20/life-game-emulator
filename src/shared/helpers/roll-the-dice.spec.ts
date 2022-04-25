import { rollTheDiceHelper as sut } from "./roll-the-dice";

describe("RollTheDiceHelper", () => {
  it("Should be able to generate a random number between 1 and 6.", () => {
    const randomNumber = sut();

    expect(randomNumber).toBeGreaterThanOrEqual(1);
    expect(randomNumber).toBeLessThanOrEqual(6);
  });
});
