import { Player } from "@shared/modules/player/entities/Player";
import { Building } from "@shared/modules/building/entities/Building";

import { Game } from "./Game";
import { Board } from "./Board";
import { CreateGameEntityDTO } from "../dtos/create-game-entity";
import { CreateBoardEntityDTO } from "../dtos/create-board-entity";
import { MAX_GAME_ROUNDS } from "../constants/max-game-rounds";

describe("Game entity", () => {
  const player = new Player("Jonh Doe");
  const building = new Building({
    name: "Doe's House",
    rent_cost: 50,
    sale_cost: 100,
  });

  const boardData: CreateBoardEntityDTO = {
    buildings: [building],
    players: [player],
  };

  const gameData: CreateGameEntityDTO = {
    board: new Board(boardData),
  };

  it("Should be able to creates a game", () => {
    const game = new Game(gameData);

    expect(game).toMatchObject(gameData);
  });

  it("Should be able while creates a game, be default max_rounds equal to MAX_GAME_ROUNDS", () => {
    const game = new Game(gameData);

    expect(game.max_rounds).toBe(MAX_GAME_ROUNDS);
  });

  it("Should be able while creates a game, be default round equal to 0", () => {
    const game = new Game(gameData);

    expect(game.round).toBe(0);
  });
});
