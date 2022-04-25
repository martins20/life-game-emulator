import supertest, { SuperTest, Test } from "supertest";

import { makeSuperTestRequest } from "@shared/test/helpers/make-supertest-request";
import { api } from "@shared/Server";
import { CreatePlayerDTO } from "@shared/modules/player/dtos/create-player";

let server: SuperTest<Test>;
let sutSpy: SutSpy;

class SutSpy {
  async createPlayer(data: CreatePlayerDTO) {
    const { body } = await makeSuperTestRequest<CreatePlayerDTO>({
      api: server,
      method: "post",
      path: "/players",
      payload: data,
    });

    return body;
  }

  async executeSUT() {
    const response = await makeSuperTestRequest({
      api: server,
      method: "get",
      path: "/players",
    });

    return response;
  }
}

describe("ListPlayersController", () => {
  beforeAll(() => {
    server = supertest(api);
    sutSpy = new SutSpy();
  });

  const createPlayerData: CreatePlayerDTO = {
    name: "Jonh Doe",
  };

  it("/POST - Should be able to list all players", async () => {
    const player = await sutSpy.createPlayer(createPlayerData);

    const { status, body } = await sutSpy.executeSUT();

    expect(status).toBe(200);
    expect(body).toMatchObject([player]);
  });
});
