import { RemovePropertyOwnerService as Sut } from "./remove-property-owner";
import { FakePropertyRepository } from "../repositories/fakes/property";
import { PropertyErrors } from "../errors/property";

let sut: Sut;
let fakePropertyRepository: FakePropertyRepository;

describe("RemovePropertyOwnerService", () => {
  beforeEach(() => {
    fakePropertyRepository = new FakePropertyRepository();
    sut = new Sut(fakePropertyRepository);
  });

  it("Should not be able to remove a property owner from a non existent property", async () => {
    const nonExistentPropertyId = 321351321;

    await expect(
      sut.execute({ property_id: nonExistentPropertyId })
    ).rejects.toBeInstanceOf(PropertyErrors.PropertyNotExistsError);
  });
});
