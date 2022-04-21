import { PlayerCategory } from "../../entities/PlayerCategory";
import { CreatePlayerCategoryDTO } from "../../dtos/create-player-category";

export interface PlayerCategoryRepositoryContract {
  create: (data: CreatePlayerCategoryDTO) => Promise<PlayerCategory>;
  findByPlayerCategoryName: (
    name: PlayerCategory["name"]
  ) => Promise<PlayerCategory | undefined>;
}
