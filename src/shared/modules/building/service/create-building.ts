import { inject, injectable } from "tsyringe";

import { BuildingRepositoryContract } from "@shared/modules/building/repositories/contract/building-repository";
import { CreateBuildingDTO } from "@shared/modules/building/dtos/create-building";

import { BuildingErrors } from "../errors/building";
import { Building } from "../entities/Building";

@injectable()
export class CreateBuildingService {
  constructor(
    @inject("BuildingsRepository")
    private propertiesRepository: BuildingRepositoryContract
  ) {}

  async execute(data: CreateBuildingDTO): Promise<Building> {
    const { sale_cost, rent_cost, name } = data;

    const isValidSaleCost = sale_cost > 0;
    const isValidRentCost = rent_cost > 0;

    if (!isValidSaleCost)
      throw new BuildingErrors.CannotCreateBuildingWithInvalidSaleCostError();

    if (!isValidRentCost)
      throw new BuildingErrors.CannotCreateBuildingWithInvalidRentCostError();

    const foundBuildingByName =
      await this.propertiesRepository.findByBuildingName(name);

    if (foundBuildingByName)
      throw new BuildingErrors.BuildingAlreadyExistsError();

    const property = await this.propertiesRepository.create(data);

    return property;
  }
}
