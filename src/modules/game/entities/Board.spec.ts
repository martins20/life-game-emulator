import { Property } from "@shared/modules/property/entities/Property";
import { Player } from "@shared/modules/player/entities/Player";

import { Board } from "./Board";
import { CreateBoardDTO } from "../dtos/create-board";

describe("Board entity", () => {
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

  it("Should be able to create a new Board", () => {
    const board = new Board(boardData);

    expect(board).toMatchObject(boardData);
  });
});
