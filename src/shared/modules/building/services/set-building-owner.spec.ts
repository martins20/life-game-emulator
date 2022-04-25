import { Player } from "@shared/modules/player/entities/Player";

import { SetBuildingOwnerService as Sut } from "./set-building-owner";
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
  async createBuilding(data: CreateBuildingDTO): Promise<Building> {
    const property = await fakeBuildingRepository.create(data);

    return property;
  }
}

describe("SetBuildingOwnerService", () => {
  beforeEach(async () => {
    fakeBuildingRepository = new FakeBuildingRepository();
    sut = new Sut(fakeBuildingRepository);

    sutSpy = new SutSpy();

    property = await sutSpy.createBuilding(propertyData);
  });

  const owner = new Player("some-player");

  it("Should be able to set a property owner", async () => {
    const propertyWithOwner = await sut.execute({
      property_id: property.id,
      owner,
    });

    expect(propertyWithOwner).toMatchObject({ ...propertyData, owner });
  });

  it("Should not be able to set a property owner with a non existent property", async () => {
    const nonExistentBuildingId = 3254020;

    await expect(
      sut.execute({
        property_id: nonExistentBuildingId,
        owner,
      })
    ).rejects.toBeInstanceOf(BuildingErrors.BuildingNotExistsError);
  });

  it("Should not be able to set a property owner in properties of already has owner", async () => {
    await fakeBuildingRepository.setBuildingOwner({
      owner,
      property_id: property.id,
    });

    await expect(
      sut.execute({
        property_id: property.id,
        owner,
      })
    ).rejects.toBeInstanceOf(BuildingErrors.BuildingAlreadyHasOwnerError);
  });
});
