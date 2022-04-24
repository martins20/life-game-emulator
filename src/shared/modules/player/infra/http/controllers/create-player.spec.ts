import supertest, { SuperTest, Test } from "supertest";

import { makeSuperTestRequest } from "@shared/test/helpers/make-supertest-request";
import { api } from "@shared/Server";
import { CreatePlayerDTO } from "@shared/modules/player/dtos/create-player";

let server: SuperTest<Test>;
let sutSpy: SutSpy;

class SutSpy {
  async executeSUT(data: CreatePlayerDTO) {
    const response = await makeSuperTestRequest<CreatePlayerDTO>({
      api: server,
      method: "post",
      path: "/players",
      payload: data,
    });

    return response;
  }
}

describe("CreatePlayerController", () => {
  beforeAll(() => {
    server = supertest(api);
    sutSpy = new SutSpy();
  });

  const createPlayerData: CreatePlayerDTO = {
    name: "Jonh Doe",
  };

  it("/POST - Should be able to create a new player", async () => {
    const { status, body } = await sutSpy.executeSUT(createPlayerData);

    expect(status).toBe(201);
    expect(body).toMatchObject({
      ...createPlayerData,
      balance: 300,
      position: 0,
      round: 0,
    });
  });

  it("/POST - Should not be able to create a player with an existent player name", async () => {
    const { status, body } = await sutSpy.executeSUT(createPlayerData);

    expect(status).toBe(400);
    expect(body).toMatchObject({
      message: "Player already exists",
    });
  });
});
