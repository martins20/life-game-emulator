import { Property } from "@shared/modules/property/entities/Property";
import { Player } from "@shared/modules/player/entities/Player";

import { Game } from "./Game";
import { Board } from "./Board";
import { CreateGameDTO } from "../dtos/create-game";
import { CreateBoardDTO } from "../dtos/create-board";

describe("Game entity", () => {
  const player = new Player("Jonh Doe");
  const building = new Property({
    name: "Doe's House",
    rent_cost: 50,
    sale_cost: 100,
  });

  const boardData: CreateBoardDTO = {
    buildings: [building],
    players: [player],
  };

  const gameData: CreateGameDTO = {
    board: new Board(boardData),
  };

  it("Should be able to creates a game", () => {
    const game = new Game(gameData);

    expect(game).toMatchObject(gameData);
  });
});
