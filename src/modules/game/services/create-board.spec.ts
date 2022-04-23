import { Property } from "@shared/modules/property/entities/Property";
import { Player } from "@shared/modules/player/entities/Player";

import { CreateBoardService as Sut } from "./create-board";
import { FakeBoardRepository } from "../repositories/fakes/board";
import { BoardErrors } from "../errors/board";
import { CreateBoardDTO } from "../dtos/create-board";

let sut: Sut;
let fakeBoardRepository: FakeBoardRepository;

describe("CreateBoardService", () => {
  beforeEach(() => {
    fakeBoardRepository = new FakeBoardRepository();
    sut = new Sut(fakeBoardRepository);
  });

  const player = new Player("Jonh Doe");
  const building = new Property({
    name: "Doe's House",
    rent_cost: 50,
    sale_cost: 100,
  });

  const boardData: CreateBoardDTO = {
    players: [player],
    buildings: [building],
  };

  it("Should not be able to create a new board without any players", async () => {
    await expect(
      sut.execute({ players: [], buildings: [building] })
    ).rejects.toBeInstanceOf(BoardErrors.CannotCreateBoardWithoutPlayersError);
  });

  it("Should not be able to create a new board without any buildings", async () => {
    await expect(
      sut.execute({ players: [player], buildings: [] })
    ).rejects.toBeInstanceOf(
      BoardErrors.CannotCreateBoardWithoutBuildingsError
    );
  });

  it("Should be able to create a new board", async () => {
    const board = await sut.execute(boardData);

    expect(board).toHaveProperty("id");
    expect(board).toMatchObject(boardData);
  });
});
