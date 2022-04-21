import { inject, injectable } from "tsyringe";
import { PropertyRepositoryContract } from "@modules/property/repositories/contract/property-repository";
import { CreatePropertyDTO } from "@modules/property/dtos/create-property";

import { PropertyErrors } from "../errors/property";
import { Property } from "../entities/Property";

@injectable()
export class CreatePropertyService {
  constructor(
    @inject("PropertiesRepository")
    private propertiesRepository: PropertyRepositoryContract
  ) {}

  async execute(data: CreatePropertyDTO): Promise<Property> {
    const { sale_cost } = data;

    const isValidSaleCost = sale_cost;

    if (!isValidSaleCost)
      throw new PropertyErrors.CannotCreatePropertyWithInvalidSaleCostError();

    const foundPropertyByName =
      await this.propertiesRepository.findByPropertyName(data.name);

    if (foundPropertyByName)
      throw new PropertyErrors.PropertyAlreadyExistsError();

    const property = await this.propertiesRepository.create(data);

    return property;
  }
}
