import { inject, injectable } from "tsyringe";

import { PropertyRepositoryContract } from "../repositories/contract/property-repository";
import { PropertyErrors } from "../errors/property";
import { Property } from "../entities/Property";
import { SetPropertyOwnerDTO } from "../dtos/set-property-owner";

@injectable()
export class SetPropertyOwnerService {
  constructor(
    @inject("PropertiesRepository")
    private propertiesRepository: PropertyRepositoryContract
  ) {}

  async execute(data: SetPropertyOwnerDTO): Promise<Property> {
    const { property_id } = data;

    const foundPropertyById = await this.propertiesRepository.findById(
      property_id
    );

    if (!foundPropertyById) throw new PropertyErrors.PropertyNotExistsError();

    if (foundPropertyById.owner_id)
      throw new PropertyErrors.PropertyAlreadyHasOwnerError();

    const updatedPropertyWithOwner =
      await this.propertiesRepository.setPropertyOwnerId(data);

    return updatedPropertyWithOwner;
  }
}
