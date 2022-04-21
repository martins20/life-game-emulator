import { Player } from "@modules/player/entities/Player";

import { SetPropertyOwnerService as Sut } from "./set-property-owner";
import { FakePropertyRepository } from "../repositories/fakes/property";
import { PropertyErrors } from "../errors/property";
import { Property } from "../entities/Property";
import { CreatePropertyDTO } from "../dtos/create-property";

let sut: Sut;
let sutSpy: SutSpy;
let property: Property;
let fakePropertyRepository: FakePropertyRepository;

const propertyData: CreatePropertyDTO = {
  name: "John's house",
  rent_cost: 10,
  sale_cost: 100,
};

class SutSpy {
  async createProperty(data: CreatePropertyDTO): Promise<Property> {
    const property = await fakePropertyRepository.create(data);

    return property;
  }
}

describe("SetPropertyOwnerService", () => {
  beforeEach(async () => {
    fakePropertyRepository = new FakePropertyRepository();
    sut = new Sut(fakePropertyRepository);

    sutSpy = new SutSpy();

    property = await sutSpy.createProperty(propertyData);
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
    const nonExistentPropertyId = 3254020;

    await expect(
      sut.execute({
        property_id: nonExistentPropertyId,
        owner,
      })
    ).rejects.toBeInstanceOf(PropertyErrors.PropertyNotExistsError);
  });

  it("Should not be able to set a property owner in properties of already has owner", async () => {
    await fakePropertyRepository.setPropertyOwner({
      owner,
      property_id: property.id,
    });

    await expect(
      sut.execute({
        property_id: property.id,
        owner,
      })
    ).rejects.toBeInstanceOf(PropertyErrors.PropertyAlreadyHasOwnerError);
  });
});
