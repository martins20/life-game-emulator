import supertest, { SuperTest, Test } from "supertest";
import { Game } from "@modules/game/entities/Game";
import { Board } from "@modules/game/entities/Board";
import { SimulateGameDTO } from "@modules/game/dtos/simulate-game";
import { CreateGameDTO } from "@modules/game/dtos/create-game";
import { CreateBoardDTO } from "@modules/game/dtos/create-board";

import { makeSuperTestRequest } from "@shared/test/helpers/make-supertest-request";
import { api } from "@shared/Server";
import { Player } from "@shared/modules/player/entities/Player";
import { CreatePlayerDTO } from "@shared/modules/player/dtos/create-player";
import { Building } from "@shared/modules/building/entities/Building";
import { CreateBuildingDTO } from "@shared/modules/building/dtos/create-building";

let game: Game;

let sutSpy: SutSpy;
let server: SuperTest<Test>;

class SutSpy {
  async createPlayer(data: CreatePlayerDTO): Promise<Player> {
    const { body } = await makeSuperTestRequest<CreatePlayerDTO>({
      api: server,
      method: "post",
      path: "/players",
      payload: data,
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

const createBuildingData: CreateBuildingDTO = {
  name: "Doe's house",
  rent_cost: 100,
  sale_cost: 150,
};

describe("SimulateGameController", () => {
  beforeAll(async () => {
    server = supertest(api);
    sutSpy = new SutSpy();

    const player = await sutSpy.createPlayer(createPlayerData);
    const building = await sutSpy.createBuilding(createBuildingData);
    const board = await sutSpy.createBoard({
      player_ids: [player.id],
      building_ids: [building.id],
    });

    game = await sutSpy.createGame({
      board_id: board.id,
    });
  });

  it("/POST - Should be able to create a new game", async () => {
    // const { status, body } = await sutSpy.executeSUT({
    //   game_id: game.id,
    // });
    // expect(status).toBe(200);
    // expect(body.winner).toBeTruthy();
    // expect(body).toMatchObject({
    //   is_game_finished: true,
    //   players: expect.arrayContaining(["Jonh Doe"]),
    // });
  });
});
