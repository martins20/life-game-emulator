import { Player } from "@modules/player/entities/Player";

import { RemovePropertyOwnerService as Sut } from "./remove-property-owner";
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
  async createPropertyWithOwner(data: CreatePropertyDTO): Promise<Property> {
    const property = await fakePropertyRepository.create(data);

    const propertyWithOwner = await fakePropertyRepository.setPropertyOwner({
      property_id: property.id,
      owner: new Player("Jonh Doe"),
    });

    return propertyWithOwner;
  }
}

describe("RemovePropertyOwnerService", () => {
  beforeEach(async () => {
    fakePropertyRepository = new FakePropertyRepository();
    sut = new Sut(fakePropertyRepository);

    sutSpy = new SutSpy();

    property = await sutSpy.createPropertyWithOwner(propertyData);
  });

  it("Should not be able to remove a property owner from a non existent property", async () => {
    const nonExistentPropertyId = 321351321;

    await expect(
      sut.execute({ property_id: nonExistentPropertyId })
    ).rejects.toBeInstanceOf(PropertyErrors.PropertyNotExistsError);
  });

  it("Should be able to remove the property owner", async () => {
    const propertyWithouOwner = await sut.execute({ property_id: property.id });

    expect(propertyWithouOwner.owner).toBeFalsy();
    expect(propertyWithouOwner).toMatchObject(propertyData);
  });
});
