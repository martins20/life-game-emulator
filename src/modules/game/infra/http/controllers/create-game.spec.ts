import supertest, { SuperTest, Test } from "supertest";
import { Board } from "@modules/game/entities/Board";
import { CreateGameDTO } from "@modules/game/dtos/create-game";
import { CreateBoardDTO } from "@modules/game/dtos/create-board";
import { MAX_GAME_ROUNDS } from "@modules/game/constants/max-game-rounds";

import { makeSuperTestRequest } from "@shared/test/helpers/make-supertest-request";
import { api } from "@shared/Server";
import { Player } from "@shared/modules/player/entities/Player";
import { SetPlayerCategoryDTO } from "@shared/modules/player/dtos/set-player-category";
import { CreatePlayerDTO } from "@shared/modules/player/dtos/create-player";
import { Building } from "@shared/modules/building/entities/Building";
import { CreateBuildingDTO } from "@shared/modules/building/dtos/create-building";
import { MAX_GAME_BUILDINGS } from "@shared/modules/building/constants/max-game-buildings";

let board: Board;

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

  async executeSUT(data: CreateGameDTO) {
    const response = await makeSuperTestRequest<CreateGameDTO>({
      api: server,
      method: "post",
      path: "/game",
      payload: data,
    });

    return response;
  }
}

const createPlayerData: CreatePlayerDTO = {
  name: "Jonh Doe",
};

const createBuildingData: CreateBuildingDTO = {
  name: "Doe's house",
  rent_cost: 100,
  sale_cost: 150,
};

describe("CreateBoardController", () => {
  beforeAll(async () => {
    server = supertest(api);
    sutSpy = new SutSpy();

    const player = await sutSpy.createPlayer(createPlayerData);
    const playerTwo = await sutSpy.createPlayer({ name: "Jonh Tree" });
    const buildings = await Promise.all(
      Array.from({ length: MAX_GAME_BUILDINGS }).map((_, index) =>
        sutSpy.createBuilding({
          ...createBuildingData,
          name: `Doe's house ${index + 1}`,
        })
      )
    );

    board = await sutSpy.createBoard({
      player_ids: [player.id, playerTwo.id],
      building_ids: buildings.map((data) => data.id),
    });
  });

  it("/POST - Should be able to create a new game", async () => {
    const { status, body } = await sutSpy.executeSUT({
      board_id: board.id,
    });

    expect(status).toBe(201);
    expect(body).toMatchObject({
      max_rounds: MAX_GAME_ROUNDS,
      round: 0,
      is_game_finished: false,
    });
  });
});
