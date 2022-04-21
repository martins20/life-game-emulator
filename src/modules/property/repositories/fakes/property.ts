import { Property } from "@modules/property/entities/Property";
import { SetPropertyOwnerDTO } from "@modules/property/dtos/set-property-owner";
import { CreatePropertyDTO } from "@modules/property/dtos/create-property";

import { PropertyRepositoryContract } from "../contract/property-repository";

export class FakePropertyRepository implements PropertyRepositoryContract {
  private properties: Property[] = [];

  async create(data: CreatePropertyDTO): Promise<Property> {
    const createdProperty = new Property(data);

    Object.assign(createdProperty, {
      id: String(Date.now() * this.properties.length + 1),
    });

    this.properties.push(createdProperty);

    return createdProperty;
  }

  async findByPropertyName(
    name: Property["name"]
  ): Promise<Property | undefined> {
    const lowerCaseName = name.toLocaleLowerCase();

    const foundProperty = this.properties.find(
      (data) => data.name.toLocaleLowerCase() === lowerCaseName
    );

    return foundProperty;
  }

  async findById(propertyID: Property["id"]): Promise<Property | undefined> {
    const foundProperty = this.properties.find(
      (data) => data.id === propertyID
    );

    return foundProperty;
  }

  async setPropertyOwner({
    property_id,
    owner,
  }: SetPropertyOwnerDTO): Promise<Property> {
    const updatedPropertyWithOwner = this.properties.map((data) =>
      data.id === property_id ? { ...data, owner } : data
    );

    this.properties = updatedPropertyWithOwner;

    const propertyWithOwner = await this.findById(property_id);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return propertyWithOwner!;
  }
}
