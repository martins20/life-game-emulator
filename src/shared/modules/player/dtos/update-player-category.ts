import { PlayerCategory } from "@shared/modules/category/modules/player-category/entities/PlayerCategory";

export interface UpdatePlayerCategoryDTO {
  player_id: string;
  category: PlayerCategory;
}
