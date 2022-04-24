import supertest, { SuperTest, Test } from "supertest";
import { CreateBoardDTO } from "@modules/game/dtos/create-board";

import { makeSuperTestRequest } from "@shared/test/helpers/make-supertest-request";
import { api } from "@shared/Server";
import { Player } from "@shared/modules/player/entities/Player";
import { CreatePlayerDTO } from "@shared/modules/player/dtos/create-player";
import { Building } from "@shared/modules/building/entities/Building";
import { CreateBuildingDTO } from "@shared/modules/building/dtos/create-building";

let player: Player;
let building: Building;
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
    building = await sutSpy.createBuilding(createBuildingData);
  });

  it("/POST - Should be able to create a new board", async () => {
    const { status, body } = await sutSpy.executeSUT({
      building_ids: [building.id],
      player_ids: [player.id],
    });

    expect(status).toBe(201);
    expect(body).toMatchObject({
      players: [player],
      buildings: [building],
    });
  });
});
