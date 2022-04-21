import { Player } from "@modules/player/entities/Player";

import { PickRandomOrderOfPlayersService as SUT } from "./pick-random-order-of-players";

let sut: SUT;

const makeRandomPlayers = (): Player[] => {
  const players = Array.from({ length: Math.floor(Math.random() * 2) + 2 }).map(
    (_, index) => ({
      name: `player ${index + 1}`,
      balance: 300,
    })
  );

  return players;
};

describe("PickRandomOrderOfPlayersService", () => {
  beforeEach(() => {
    sut = new SUT();
  });

  const players: Player[] = makeRandomPlayers();

  it("Should return a random player order list.", () => {
    const randomPlayerOrder = sut.execute(players);

    expect(randomPlayerOrder).not.toEqual(players);
  });

  it("Should re-suffle the array is the result of suffled array was equal to the players", () => {
    const mockEvery = jest.fn();
    global.Array.prototype.every = mockEvery;

    mockEvery.mockImplementationOnce(() => true);
    sut.execute(players);

    expect(mockEvery).toHaveBeenCalledTimes(2);
  });
});
