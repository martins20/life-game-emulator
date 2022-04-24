import { FakeBuildingRepository } from "@shared/modules/building/repositories/fakes/building";

import { CreateBuildingService as Sut } from "./create-building";
import { BuildingErrors } from "../errors/building";
import { CreateBuildingDTO } from "../dtos/create-building";

let sut: Sut;
let fakeBuildingRepository: FakeBuildingRepository;

describe("CreateBuildingService", () => {
  beforeEach(() => {
    fakeBuildingRepository = new FakeBuildingRepository();
    sut = new Sut(fakeBuildingRepository);
  });

  const propertyData: CreateBuildingDTO = {
    name: "Doe's house",
    rent_cost: 80,
    sale_cost: 200,
  };

  it("Should be able to create a new property", async () => {
    const property = await sut.execute(propertyData);

    expect(property).toHaveProperty("id");
    expect(property.owner).toBeFalsy();
    expect(property).toMatchObject(propertyData);
  });

  it("Should not be able to create a property with an existent property name", async () => {
    await fakeBuildingRepository.create(propertyData);

    await expect(sut.execute(propertyData)).rejects.toBeInstanceOf(
      BuildingErrors.BuildingAlreadyExistsError
    );
  });

  it("Should not be able to create a new property with 'sale_cost' equal to 0", async () => {
    await expect(
      sut.execute({ ...propertyData, sale_cost: 0 })
    ).rejects.toBeInstanceOf(
      BuildingErrors.CannotCreateBuildingWithInvalidSaleCostError
    );
  });

  it("Should not be able to create a new property with 'sale_cost' less than 0", async () => {
    await expect(
      sut.execute({ ...propertyData, sale_cost: -1 })
    ).rejects.toBeInstanceOf(
      BuildingErrors.CannotCreateBuildingWithInvalidSaleCostError
    );
  });

  it("Should not be able to create a new property with 'rent_cost' equal to 0", async () => {
    await expect(
      sut.execute({ ...propertyData, rent_cost: 0 })
    ).rejects.toBeInstanceOf(
      BuildingErrors.CannotCreateBuildingWithInvalidRentCostError
    );
  });

  it("Should not be able to create a new property with 'rent_cost' less than 0", async () => {
    await expect(
      sut.execute({ ...propertyData, rent_cost: -1 })
    ).rejects.toBeInstanceOf(
      BuildingErrors.CannotCreateBuildingWithInvalidRentCostError
    );
  });
});
