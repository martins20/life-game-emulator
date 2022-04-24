import { Building } from "./Building";
import { CreateBuildingDTO } from "../dtos/create-building";

const makeBuilding = (data: CreateBuildingDTO): Building => {
  const property = new Building(data);

  return property;
};

describe("Building entity", () => {
  const propertyData: CreateBuildingDTO = {
    name: "some-name-here",
    rent_cost: 20,
    sale_cost: 80,
  };

  it("Should creates a Building with default balance equal to 'default-Building-balance'", () => {
    const Building = makeBuilding(propertyData);

    expect(Building).toMatchObject(propertyData);
  });
});
