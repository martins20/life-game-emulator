import { FakePropertyRepository } from "@modules/property/repositories/fakes/property";

import { CreatePropertyService as Sut } from "./create-property";
import { PropertyErrors } from "../errors/property";
import { CreatePropertyDTO } from "../dtos/create-property";

let sut: Sut;
let fakePropertyRepository: FakePropertyRepository;

describe("CreatePropertyService", () => {
  beforeEach(() => {
    fakePropertyRepository = new FakePropertyRepository();
    sut = new Sut(fakePropertyRepository);
  });

  const propertyData: CreatePropertyDTO = {
    name: "Doe's house",
    rent_cost: 80,
    sale_cost: 200,
  };

  it("Should be able to create a new property", async () => {
    const property = await sut.execute(propertyData);

    expect(property).toHaveProperty("id");
    expect(property).toMatchObject(propertyData);
  });

  it("Should not be able to create a property with an existent property name", async () => {
    await fakePropertyRepository.create(propertyData);

    await expect(sut.execute(propertyData)).rejects.toBeInstanceOf(
      PropertyErrors.PropertyAlreadyExistsError
    );
  });
});
