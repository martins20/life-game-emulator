import { Property } from "@shared/modules/property/entities/Property";
import { Player } from "@shared/modules/player/entities/Player";

import { Board } from "./Board";
import { CreateBoardEntityDTO } from "../dtos/create-board-entity";

describe("Board entity", () => {
  const player = new Player("Jonh Doe");
  const building = new Property({
    name: "Doe's House",
    rent_cost: 50,
    sale_cost: 100,
  });

  const boardData: CreateBoardEntityDTO = {
    buildings: [building],
    players: [player],
  };

  it("Should be able to create a new Board", () => {
    const board = new Board(boardData);

    expect(board).toMatchObject(boardData);
  });
});
