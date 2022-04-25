import supertest, { SuperTest, Test } from "supertest";
import { Game } from "@modules/game/entities/Game";
import { Board } from "@modules/game/entities/Board";
import { SimulateGameDTO } from "@modules/game/dtos/simulate-game";
import { CreateGameDTO } from "@modules/game/dtos/create-game";
import { CreateBoardDTO } from "@modules/game/dtos/create-board";

import { makeSuperTestRequest } from "@shared/test/helpers/make-supertest-request";
import { api } from "@shared/Server";
import { Player } from "@shared/modules/player/entities/Player";
import { SetPlayerCategoryDTO } from "@shared/modules/player/dtos/set-player-category";
import { CreatePlayerDTO } from "@shared/modules/player/dtos/create-player";
import { generateBuildingDataWithRandomRentAndSaleCostValuesHelper } from "@shared/modules/building/helpers/generate-building-data-with-random-rent-and-sale-cost-values";
import { Building } from "@shared/modules/building/entities/Building";
import { CreateBuildingDTO } from "@shared/modules/building/dtos/create-building";
import { MAX_GAME_BUILDINGS } from "@shared/modules/building/constants/max-game-buildings";

let game: Game;

let sutSpy: SutSpy;
let server: SuperTest<Test>;

class SutSpy {
  async createPlayer(data: CreatePlayerDTO): Promise<Player> {
    const { body: createdPlayer } = await makeSuperTestRequest<CreatePlayerDTO>(
      {
        api: server,
        method: "post",
        path: "/players",
        payload: data,
      }
    );

    const { body } = await makeSuperTestRequest<SetPlayerCategoryDTO>({
      api: server,
      method: "put",
      path: "/players/category",
      payload: {
        player_id: createdPlayer.id,
        category_name: "integration-test–category-name",
      },
    });

    return body;
  }

  async createBuilding(data: CreateBuildingDTO): Promise<Building> {
    const { body } = await makeSuperTestRequest<CreateBuildingDTO>({
      api: server,
      method: "post",
      path: "/buildings",
      payload: data,
    });

    return body;
  }

  async createBoard(data: CreateBoardDTO): Promise<Board> {
    const { body } = await makeSuperTestRequest<CreateBoardDTO>({
      api: server,
      method: "post",
      path: "/boards",
      payload: data,
    });

    return body;
  }

  async createGame(data: CreateGameDTO): Promise<Game> {
    const { body } = await makeSuperTestRequest<CreateGameDTO>({
      api: server,
      method: "post",
      path: "/game",
      payload: data,
    });

    return body;
  }

  async executeSUT(data: SimulateGameDTO) {
    const response = await makeSuperTestRequest<SimulateGameDTO>({
      api: server,
      method: "post",
      path: "/game/simulate",
      payload: data,
    });

    return response;
  }
}

const createPlayerData: CreatePlayerDTO = {
  name: "Jonh Doe",
};

describe("SimulateGameController", () => {
  beforeAll(async () => {
    server = supertest(api);
    sutSpy = new SutSpy();

    const player = await sutSpy.createPlayer(createPlayerData);
    const playerTwo = await sutSpy.createPlayer({ name: "Jonh Tree" });
    const building = await Promise.all(
      Array.from({ length: MAX_GAME_BUILDINGS }).map(
        async (_, index) =>
          await sutSpy.createBuilding(
            generateBuildingDataWithRandomRentAndSaleCostValuesHelper(
              `Building ${index + 1}`
            )
          )
      )
    );

    const board = await sutSpy.createBoard({
      player_ids: [player.id, playerTwo.id],
      building_ids: building.map((data) => data.id),
    });

    game = await sutSpy.createGame({
      board_id: board.id,
    });
  });

  it("/POST - Should be able to create a new game", async () => {
    const { status, body } = await sutSpy.executeSUT({
      game_id: game.id,
    });

    expect(status).toBe(200);
    expect(body.winner).toBeTruthy();
    expect(body).toMatchObject({
      players: expect.arrayContaining(["Jonh Doe"]),
    });
  });
});
