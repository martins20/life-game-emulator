import supertest, { SuperTest, Test } from "supertest";

import { makeSuperTestRequest } from "@shared/test/helpers/make-supertest-request";
import { api } from "@shared/Server";
import { CreateBuildingDTO } from "@shared/modules/building/dtos/create-building";

let server: SuperTest<Test>;
let sutSpy: SutSpy;

class SutSpy {
  async executeSUT(data: CreateBuildingDTO) {
    const response = await makeSuperTestRequest<CreateBuildingDTO>({
      api: server,
      method: "post",
      path: "/buildings",
      payload: data,
    });

    return response;
  }
}

describe("CreateBuildingController", () => {
  beforeAll(() => {
    server = supertest(api);
    sutSpy = new SutSpy();
  });

  const createBuildingData: CreateBuildingDTO = {
    name: "Doe's house",
    rent_cost: 30,
    sale_cost: 150,
  };

  it("/POST - Should be able to create a new building", async () => {
    const { status, body } = await sutSpy.executeSUT(createBuildingData);

    expect(status).toBe(201);
    expect(body).toMatchObject({
      ...createBuildingData,
      owner: null,
    });
  });

  it("/POST - Should not be able to create a building with an existent building name", async () => {
    const { status, body } = await sutSpy.executeSUT(createBuildingData);

    expect(status).toBe(400);
    expect(body).toMatchObject({
      message: "Building already exists",
    });
  });
});
