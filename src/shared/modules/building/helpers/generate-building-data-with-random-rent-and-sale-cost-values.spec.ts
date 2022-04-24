import { GenerateBuildingDataWithRandomRentAndSaleCostValuesHelper as sut } from "./generate-building-data-with-random-rent-and-sale-cost-values";

const spyRound = jest.spyOn(Math, "round");

describe("GenerateBuildingDataWithRandomRentAndSaleCostValuesHelper", () => {
  beforeEach(() => {
    spyRound.mockImplementation((_: number) => 1);
  });

  it("Should be able to generate a building with random sale_const and rent_cost values", () => {
    const building = sut("Doe's House");

    expect(building.rent_cost).toBe(1);
    expect(building.sale_cost).toBe(1);
  });
});
