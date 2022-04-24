import { inject, injectable } from "tsyringe";

import { PlayerRepositoryContract } from "@shared/modules/player/repositories/contract/player-repository";
import { PlayerErrors } from "@shared/modules/player/errors/player";
import { Player } from "@shared/modules/player/entities/Player";
import { PlayerCategoryRepositoryContract } from "@shared/modules/category/modules/player-category/repositories/contract/player-category-repository";
import { PlayerCategoryErrors } from "@shared/modules/category/modules/player-category/errors/player-category";

import { SetPlayerCategoryDTO } from "../dtos/set-player-category";

@injectable()
export class SetPlayerCategoryService {
  constructor(
    @inject("PlayerCategoriesRepository")
    private playerCategoriesRepository: PlayerCategoryRepositoryContract,
    @inject("PlayersRepository")
    private playersRepository: PlayerRepositoryContract
  ) {}

  async execute({
    player_id,
    category_name,
  }: SetPlayerCategoryDTO): Promise<Player> {
    const foundPlayerById = await this.playersRepository.findById(player_id);

    if (!foundPlayerById) throw new PlayerErrors.PlayerNotExistsError();

    const foundPlayerCategoryByName =
      await this.playerCategoriesRepository.findByPlayerCategoryName(
        category_name
      );

    if (!foundPlayerCategoryByName)
      throw new PlayerCategoryErrors.PlayerCategoryNotExistsError();

    const playerWithCategory = await this.playersRepository.setPlayerCategory({
      player_id,
      category: foundPlayerCategoryByName,
    });

    return playerWithCategory;
  }
}
