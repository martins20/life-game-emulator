import { inject, injectable } from "tsyringe";

import { PlayerCategoryRepositoryContract } from "../repositories/contract/player-category-repository";
import { PlayerCategoryErrors } from "../errors/player-category";
import { PlayerCategory } from "../entities/PlayerCategory";
import { CreatePlayerCategoryDTO } from "../dtos/create-player-category";

@injectable()
export class CreatePlayerCategoryService {
  constructor(
    @inject("PlayerCategoriesRepository")
    private playerCategoriesRepository: PlayerCategoryRepositoryContract
  ) {}

  async execute(data: CreatePlayerCategoryDTO): Promise<PlayerCategory> {
    const foundPlayerCategoryByName =
      await this.playerCategoriesRepository.findByPlayerCategoryName(data.name);

    if (foundPlayerCategoryByName)
      throw new PlayerCategoryErrors.PlayerCategoryNameAlreadyExistsError();

    const playerCategory = await this.playerCategoriesRepository.create(data);

    return playerCategory;
  }
}
