import supertest, { SuperTest, Test } from "supertest";

import { makeSuperTestRequest } from "@shared/test/helpers/make-supertest-request";
import { api } from "@shared/Server";
import { Player } from "@shared/modules/player/entities/Player";
import { SetPlayerCategoryDTO } from "@shared/modules/player/dtos/set-player-category";
import { CreatePlayerDTO } from "@shared/modules/player/dtos/create-player";

let server: SuperTest<Test>;
let sutSpy: SutSpy;
let player: Player;

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

  async executeSUT(data: SetPlayerCategoryDTO) {
    const response = await makeSuperTestRequest<SetPlayerCategoryDTO>({
      api: server,
      method: "put",
      path: "/players/category",
      payload: data,
    });

    return response;
  }
}

describe("SetPlayerCategoryController", () => {
  beforeAll(async () => {
    server = supertest(api);
    sutSpy = new SutSpy();

    player = await sutSpy.createPlayer({ name: "John Doe" });
  });

  it("/PUT - Should be able to set a player category", async () => {
    const setPlayerCategoryData: SetPlayerCategoryDTO = {
      player_id: player.id,
      category_name: "integration-test–category-name",
    };
    const { status, body } = await sutSpy.executeSUT(setPlayerCategoryData);

    expect(status).toBe(200);
    expect(body).toMatchObject(
      expect.objectContaining({
        category: expect.objectContaining({
          name: "integration-test–category-name",
        }),
      })
    );
  });

  it("/PUT - Should not be able to set a player category with a non existent category name", async () => {
    const setPlayerCategoryData: SetPlayerCategoryDTO = {
      player_id: player.id,
      category_name: "non-existent-category-name",
    };
    const { status, body } = await sutSpy.executeSUT(setPlayerCategoryData);

    expect(status).toBe(404);
    expect(body).toMatchObject({ message: "Player category not exists" });
  });

  it("/PUT - Should not be able to set a player category with a non existent player", async () => {
    const setPlayerCategoryData: SetPlayerCategoryDTO = {
      player_id: "non-existent-player-id",
      category_name: "integration-test–category-name",
    };
    const { status, body } = await sutSpy.executeSUT(setPlayerCategoryData);

    expect(status).toBe(404);
    expect(body).toMatchObject({ message: "Player not exists" });
  });
});
