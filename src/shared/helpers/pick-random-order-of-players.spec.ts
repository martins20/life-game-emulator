import { Player } from "@shared/modules/player/entities/Player";

import { pickRandomOrderOfPlayersHelper as sut } from "./pick-random-order-of-players";

const makeRandomPlayers = (): Player[] => {
  const players = Array.from({ length: Math.floor(Math.random() * 2) + 2 }).map(
    (_, index) => ({
      id: String(index),
      name: `player ${index + 1}`,
      balance: 300,
      position: 0,
      category: null,
      round: 0,
    })
  );

  return players;
};

describe("PickRandomOrderOfPlayersHelper", () => {
  const players: Player[] = makeRandomPlayers();

  it("Should return a random player order list.", () => {
    const randomPlayerOrder = sut(players);

    expect(randomPlayerOrder).not.toEqual(players);
  });

  it("Should re-suffle the array is the result of suffled array was equal to the players", () => {
    const mockEvery = jest.fn();
    global.Array.prototype.every = mockEvery;

    mockEvery.mockImplementationOnce(() => true);
    sut(players);

    expect(mockEvery).toHaveBeenCalledTimes(2);
  });
});
