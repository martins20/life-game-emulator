import { Property } from "@modules/property/entities/Property";
import { CreatePropertyDTO } from "@modules/property/dtos/create-property";

import { PropertyRepositoryContract } from "../contract/property-repository";

export class InMemoryPropertyRepository implements PropertyRepositoryContract {
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
}
