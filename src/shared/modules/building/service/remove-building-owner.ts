import { inject, injectable } from "tsyringe";

import { BuildingRepositoryContract } from "../repositories/contract/building-repository";
import { BuildingErrors } from "../errors/building";
import { Building } from "../entities/Building";
import { RemoveBuildingOwnerDTO } from "../dtos/remove-building-owner";

@injectable()
export class RemoveBuildingOwnerService {
  constructor(
    @inject("PropertiesRepository")
    private fakePropertiesRepository: BuildingRepositoryContract
  ) {}

  async execute({ property_id }: RemoveBuildingOwnerDTO): Promise<Building> {
    const foundBuildingById = await this.fakePropertiesRepository.findById(
      property_id
    );

    if (!foundBuildingById) throw new BuildingErrors.BuildingNotExistsError();

    const propertyWithOwner =
      await this.fakePropertiesRepository.removeBuildingByOwner({
        property_id,
      });

    return propertyWithOwner;
  }
}
