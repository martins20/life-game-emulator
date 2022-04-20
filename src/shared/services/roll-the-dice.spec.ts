import { RollTheDice as SUT } from "./roll-the-dice";

let sut: SUT;

describe("RollTheDice", () => {
  beforeEach(() => {
    sut = new SUT();
  });

  it("Should be able to generate a random number between 0 and 1", () => {
    const randomNumber = sut.execute();

    expect(randomNumber).toBeGreaterThanOrEqual(1);
    expect(randomNumber).toBeLessThanOrEqual(6);
  });
});
