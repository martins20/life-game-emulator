import { Player } from "@shared/modules/player/entities/Player";

import { RemoveBuildingOwnerService as Sut } from "./remove-building-owner";
import { FakeBuildingRepository } from "../repositories/fakes/building";
import { BuildingErrors } from "../errors/building";
import { Building } from "../entities/Building";
import { CreateBuildingDTO } from "../dtos/create-building";

let sut: Sut;
let sutSpy: SutSpy;
let property: Building;
let fakeBuildingRepository: FakeBuildingRepository;

const propertyData: CreateBuildingDTO = {
  name: "John's house",
  rent_cost: 10,
  sale_cost: 100,
};

class SutSpy {
  async createBuildingWithOwner(data: CreateBuildingDTO): Promise<Building> {
    const property = await fakeBuildingRepository.create(data);

    const propertyWithOwner = await fakeBuildingRepository.setBuildingOwner({
      property_id: property.id,
      owner: new Player("Jonh Doe"),
    });

    return propertyWithOwner;
  }
}

describe("RemoveBuildingOwnerService", () => {
  beforeEach(async () => {
    fakeBuildingRepository = new FakeBuildingRepository();
    sut = new Sut(fakeBuildingRepository);

    sutSpy = new SutSpy();

    property = await sutSpy.createBuildingWithOwner(propertyData);
  });

  it("Should not be able to remove a property owner from a non existent property", async () => {
    const nonExistentBuildingId = 321351321;

    await expect(
      sut.execute({ property_id: nonExistentBuildingId })
    ).rejects.toBeInstanceOf(BuildingErrors.BuildingNotExistsError);
  });

  it("Should be able to remove the property owner", async () => {
    const propertyWithouOwner = await sut.execute({ property_id: property.id });

    expect(propertyWithouOwner.owner).toBeFalsy();
    expect(propertyWithouOwner).toMatchObject(propertyData);
  });
});
