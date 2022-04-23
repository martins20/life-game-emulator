import { Property } from "@shared/modules/property/entities/Property";
import { FakePlayerRepository } from "@shared/modules/player/repositories/fakes/player";
import { PlayerErrors } from "@shared/modules/player/errors/player";
import { Player } from "@shared/modules/player/entities/Player";

import { CreateBoardService as Sut } from "./create-board";
import { FakeBoardRepository } from "../repositories/fakes/board";
import { BoardErrors } from "../errors/board";
import { CreateBoardDTO } from "../dtos/create-board";

let sut: Sut;
let player: Player;
let fakeBoardRepository: FakeBoardRepository;
let fakePlayerRepository: FakePlayerRepository;

describe("CreateBoardService", () => {
  beforeEach(async () => {
    fakeBoardRepository = new FakeBoardRepository();
    fakePlayerRepository = new FakePlayerRepository();
    sut = new Sut(fakeBoardRepository, fakePlayerRepository);

    player = await fakePlayerRepository.create({
      name: "Jonh Doe",
    });
  });

  const building = new Property({
    name: "Doe's House",
    rent_cost: 50,
    sale_cost: 100,
  });

  it("Should not be able to create a new board without any player", async () => {
    await expect(
      sut.execute({ player_ids: [], building_ids: [building.id] })
    ).rejects.toBeInstanceOf(BoardErrors.CannotCreateBoardWithoutPlayersError);
  });

  it("Should not be able to create a new board without any buildings", async () => {
    await expect(
      sut.execute({ player_ids: [player.id], building_ids: [] })
    ).rejects.toBeInstanceOf(
      BoardErrors.CannotCreateBoardWithoutBuildingsError
    );
  });

  it("Should not be able to create a new board with a non-existent player", async () => {
    await expect(
      sut.execute({
        player_ids: ["non-existent-player-id"],
        building_ids: [building.id],
      })
    ).rejects.toBeInstanceOf(PlayerErrors.PlayersNotExistsError);
  });

  it("Should be able to create a new board", async () => {
    const boardData: CreateBoardDTO = {
      player_ids: [player.id],
      building_ids: [building.id],
    };

    const board = await sut.execute(boardData);

    expect(board).toHaveProperty("id");
    expect(board).toMatchObject(boardData);
  });
});
