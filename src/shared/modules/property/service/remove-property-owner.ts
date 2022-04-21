import { inject, injectable } from "tsyringe";

import { PropertyRepositoryContract } from "../repositories/contract/property-repository";
import { PropertyErrors } from "../errors/property";
import { Property } from "../entities/Property";
import { RemovePropertyOwnerDTO } from "../dtos/remove-property-owner";

@injectable()
export class RemovePropertyOwnerService {
  constructor(
    @inject("PropertiesRepository")
    private fakePropertiesRepository: PropertyRepositoryContract
  ) {}

  async execute({ property_id }: RemovePropertyOwnerDTO): Promise<Property> {
    const foundPropertyById = await this.fakePropertiesRepository.findById(
      property_id
    );

    if (!foundPropertyById) throw new PropertyErrors.PropertyNotExistsError();

    const propertyWithOwner =
      await this.fakePropertiesRepository.removePropertyByOwner({
        property_id,
      });

    return propertyWithOwner;
  }
}
