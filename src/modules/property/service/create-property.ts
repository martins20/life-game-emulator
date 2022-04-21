import { inject, injectable } from "tsyringe";
import { PropertyRepositoryContract } from "@modules/property/repositories/contract/property-repository";
import { CreatePropertyDTO } from "@modules/property/dtos/create-property";

import { Property } from "../entities/Property";

@injectable()
export class CreatePropertyService {
  constructor(
    @inject("PropertiessRepository")
    private propertiessRepository: PropertyRepositoryContract
  ) {}

  async execute(data: CreatePropertyDTO): Promise<Property> {
    const property = await this.propertiessRepository.create(data);

    return property;
  }
}
