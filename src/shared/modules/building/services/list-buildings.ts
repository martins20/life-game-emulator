import { inject, injectable } from "tsyringe";

import { BuildingRepositoryContract } from "../repositories/contract/building-repository";
import { Building } from "../entities/Building";

@injectable()
export class ListBuildingsService {
  constructor(
    @inject("BuildingsRepository")
    private buildingsRepository: BuildingRepositoryContract
  ) {}

  async execute(): Promise<Building[]> {
    const buildings = await this.buildingsRepository.list();

    return buildings;
  }
}
