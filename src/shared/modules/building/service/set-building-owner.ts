import { inject, injectable } from "tsyringe";

import { BuildingRepositoryContract } from "../repositories/contract/building-repository";
import { BuildingErrors } from "../errors/building";
import { Building } from "../entities/Building";
import { SetBuildingOwnerDTO } from "../dtos/set-building-owner";

@injectable()
export class SetBuildingOwnerService {
  constructor(
    @inject("PropertiesRepository")
    private propertiesRepository: BuildingRepositoryContract
  ) {}

  async execute(data: SetBuildingOwnerDTO): Promise<Building> {
    const { property_id } = data;

    const foundBuildingById = await this.propertiesRepository.findById(
      property_id
    );

    if (!foundBuildingById) throw new BuildingErrors.BuildingNotExistsError();

    if (foundBuildingById.owner?.name)
      throw new BuildingErrors.BuildingAlreadyHasOwnerError();

    const updatedBuildingWithOwner =
      await this.propertiesRepository.setBuildingOwner(data);

    return updatedBuildingWithOwner;
  }
}
