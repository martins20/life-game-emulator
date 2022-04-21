import { Property } from "./Property";
import { CreatePropertyDTO } from "../dtos/create-property";

const makeProperty = (data: CreatePropertyDTO): Property => {
  const property = new Property(data);

  return property;
};

describe("Property entity", () => {
  const propertyData: CreatePropertyDTO = {
    name: "some-name-here",
    rent_cost: 20,
    sale_cost: 80,
  };

  it("Should creates a Property with default balance equal to 'default-Property-balance'", () => {
    const Property = makeProperty(propertyData);

    expect(Property).toMatchObject(propertyData);
  });
});
