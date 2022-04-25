import supertest, { SuperTest, Test } from "supertest";
import { CreateBoardDTO } from "@modules/game/dtos/create-board";

import { makeSuperTestRequest } from "@shared/test/helpers/make-supertest-request";
import { api } from "@shared/Server";
import { Player } from "@shared/modules/player/entities/Player";
import { SetPlayerCategoryDTO } from "@shared/modules/player/dtos/set-player-category";
import { CreatePlayerDTO } from "@shared/modules/player/dtos/create-player";
import { Building } from "@shared/modules/building/entities/Building";
import { CreateBuildingDTO } from "@shared/modules/building/dtos/create-building";

let player: Player;
let playerTwo: Player;
let building: Building;
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

  async executeSUT(data: CreateBoardDTO) {
    const response = await makeSuperTestRequest<CreateBoardDTO>({
      api: server,
      method: "post",
      path: "/boards",
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

    player = await sutSpy.createPlayer(createPlayerData);
    playerTwo = await sutSpy.createPlayer({ name: "Jonh Tree'" });
    building = await sutSpy.createBuilding(createBuildingData);
  });

  it("/POST - Should be able to create a new board", async () => {
    const { status, body } = await sutSpy.executeSUT({
      building_ids: [building.id],
      player_ids: [player.id, playerTwo.id],
    });

    expect(status).toBe(201);
    expect(body).toMatchObject({
      players: expect.arrayContaining([player, playerTwo]),
      buildings: [building],
    });
  });

  it("/POST - Should not be able to create a new board with a non-existing player", async () => {
    const { status, body } = await sutSpy.executeSUT({
      building_ids: [building.id],
      player_ids: ["non-existent-player", "non-existent-player-2"],
    });

    expect(status).toBe(404);
    expect(body).toMatchObject({
      message: "Players [non-existent-player,non-existent-player-2] not exists",
    });
  });

  it("/POST - Should not be able to create a new board with a non-existing building", async () => {
    const nonExistentBuildingId = 6513513521;

    const { status, body } = await sutSpy.executeSUT({
      building_ids: [nonExistentBuildingId],
      player_ids: [player.id, playerTwo.id],
    });

    expect(status).toBe(404);
    expect(body).toMatchObject({
      message: "Buildings [1] not exists",
    });
  });

  it("/POST - Should not be able to create a new board with an empty building_ids", async () => {
    const { status, body } = await sutSpy.executeSUT({
      building_ids: [],
      player_ids: [player.id, playerTwo.id],
    });

    expect(status).toBe(400);
    expect(body).toMatchObject({
      message: "Cannot create board without buildings.",
    });
  });

  it("/POST - Should not be able to create a new board with one player", async () => {
    const { status, body } = await sutSpy.executeSUT({
      building_ids: [building.id],
      player_ids: [player.id],
    });

    expect(status).toBe(400);
    expect(body).toMatchObject({
      message: "Cannot create board with just one player.",
    });
  });

  it("/POST - Should not be able to create a new board with an empty player_ids", async () => {
    const { status, body } = await sutSpy.executeSUT({
      building_ids: [building.id],
      player_ids: [],
    });

    expect(status).toBe(400);
    expect(body).toMatchObject({
      message: "Cannot create board without players.",
    });
  });
});
