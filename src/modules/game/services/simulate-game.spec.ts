import { FakePlayerRepository } from "@shared/modules/player/repositories/fakes/player";
import { Player } from "@shared/modules/player/entities/Player";
import { CreatePlayerDTO } from "@shared/modules/player/dtos/create-player";
import { FakeBuildingRepository } from "@shared/modules/building/repositories/fakes/building";
import { Building } from "@shared/modules/building/entities/Building";
import { CreateBuildingDTO } from "@shared/modules/building/dtos/create-building";

import { SimulateGameService as Sut } from "./simulate-game";
import { FakeGameRepository } from "../repositories/fakes/game";
import { FakeBoardRepository } from "../repositories/fakes/board";
import { GameErrors } from "../errors/game";
import { Game } from "../entities/Game";
import { Board } from "../entities/Board";
import { CreateGameEntityDTO } from "../dtos/create-game-entity";
import { CreateBoardEntityDTO } from "../dtos/create-board-entity";

let sut: Sut;
let sutSpy: SutSpy;
let fakeGameRepository: FakeGameRepository;
let fakeBoardRepository: FakeBoardRepository;
let fakePlayerRepository: FakePlayerRepository;
let fakeBuildingRepository: FakeBuildingRepository;

const playerName = "Player name";
const buildingName = "some building name";

const mockCategoryCallback = jest.fn();

class SutSpy {
  async createPlayer(data: CreatePlayerDTO): Promise<Player> {
    const { id } = await fakePlayerRepository.create(data);

    const player = await fakePlayerRepository.setPlayerCategory({
      player_id: id,
      category: {
        id: "some-category-id",
        name: "some-category-name",
        buyBuildingCondictionResponseCallback: mockCategoryCallback,
      },
    });

    return player;
  }

  async createBuilding(data: CreateBuildingDTO): Promise<Building> {
    const building = await fakeBuildingRepository.create(data);

    return building;
  }

  async createBoard(data: CreateBoardEntityDTO): Promise<Board> {
    const board = await fakeBoardRepository.create(data);

    return board;
  }

  async createGame(data: CreateGameEntityDTO): Promise<Game> {
    const game = await fakeGameRepository.create(data);

    return game;
  }

  async makeGameWithOnePlayer(): Promise<Game> {
    const player = await sutSpy.createPlayer({ name: playerName });
    const building = await sutSpy.createBuilding({
      name: buildingName,
      rent_cost: 10,
      sale_cost: 100,
    });

    const board = await sutSpy.createBoard({
      players: [player],
      buildings: [building],
    });

    const gameWithOnePlayer = await this.createGame({
      board,
    });

    return gameWithOnePlayer;
  }

  async makeFinishedGame(): Promise<Game> {
    const playerOne = await sutSpy.createPlayer({ name: playerName });
    const playerTwo = await sutSpy.createPlayer({ name: `${playerName} 2` });
    const building = await sutSpy.createBuilding({
      name: buildingName,
      rent_cost: 10,
      sale_cost: 100,
    });

    const board = await sutSpy.createBoard({
      players: [playerOne, playerTwo],
      buildings: [building],
    });

    const { id } = await this.createGame({
      board,
    });

    const game = await fakeGameRepository.finishGame(id);

    return game;
  }
}

describe("SimulateGameService", () => {
  fakeGameRepository = new FakeGameRepository();
  fakeBoardRepository = new FakeBoardRepository();
  fakePlayerRepository = new FakePlayerRepository();
  fakeBuildingRepository = new FakeBuildingRepository();

  sutSpy = new SutSpy();

  sut = new Sut(
    fakeGameRepository,
    fakeBoardRepository,
    fakePlayerRepository,
    fakeBuildingRepository
  );

  it("Should not be able to simulate a non existent game", async () => {
    await expect(
      sut.execute({
        game_id: "non-existent-game",
      })
    ).rejects.toBeInstanceOf(GameErrors.GameNotExistsError);
  });

  it("Should not be able to simulate a game with one player", async () => {
    const gameWithOnePlayer = await sutSpy.makeGameWithOnePlayer();

    await expect(
      sut.execute({
        game_id: gameWithOnePlayer.id,
      })
    ).rejects.toBeInstanceOf(GameErrors.CannotSimulateGameWithOnePlayerError);
  });

  it("Should not be able to simulate a finished game", async () => {
    const finishedGame = await sutSpy.makeFinishedGame();

    await expect(
      sut.execute({
        game_id: finishedGame.id,
      })
    ).rejects.toBeInstanceOf(GameErrors.CannotSimulateFinishedGameError);
  });
});
