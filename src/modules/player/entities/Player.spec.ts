import { DEFAULT_PLAYER_BALANCE } from "@shared/constants/default-player-balance";

import { Player } from "./Player";
import { CreatePlayerDTO } from "../dtos/create-player";

const makePlayer = ({ name }: CreatePlayerDTO): Player => {
  const player = new Player(name);

  return player;
};

describe("Player entity", () => {
  it("Should creates a player with default balance equal to 'default-player-balance'", () => {
    const playerName = "john Doe";

    const player = makePlayer({ name: playerName });

    expect(player).toMatchObject({
      name: playerName,
      balance: DEFAULT_PLAYER_BALANCE,
    });
  });
});
