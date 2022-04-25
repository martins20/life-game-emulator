import supertest, { SuperTest, Test } from "supertest";

import { makeSuperTestRequest } from "@shared/test/helpers/make-supertest-request";
import { api } from "@shared/Server";
import { CreateBuildingDTO } from "@shared/modules/building/dtos/create-building";

let server: SuperTest<Test>;
let sutSpy: SutSpy;

class SutSpy {
  async createBuilding(data: CreateBuildingDTO) {
    const { body } = await makeSuperTestRequest<CreateBuildingDTO>({
      api: server,
      method: "post",
      path: "/buildings",
      payload: data,
    });

    return body;
  }

  async executeSUT() {
    const response = await makeSuperTestRequest({
      api: server,
      method: "get",
      path: "/buildings",
    });

    return response;
  }
}

describe("ListBuildingsController", () => {
  beforeAll(() => {
    server = supertest(api);
    sutSpy = new SutSpy();
  });

  const createBuildingData: CreateBuildingDTO = {
    name: "Doe's House",
    rent_cost: 100,
    sale_cost: 150,
  };

  it("/GET - Should be able to list all buildings", async () => {
    const building = await sutSpy.createBuilding(createBuildingData);

    const { status, body } = await sutSpy.executeSUT();

    expect(status).toBe(200);
    expect(body).toMatchObject([building]);
  });
});
