import { CreatePlayerCategoryDTO } from "../dtos/create-player-category";
import { BuyBuildingCondictionsParamDTO } from "../dtos/buy-building-condictions-param";

export const IMPULSIVE_PLAYER_CATEGORY: CreatePlayerCategoryDTO = {
  name: "impulsive",
  buyBuildingCondictionResponseCallback: (
    _: BuyBuildingCondictionsParamDTO
  ): boolean => {
    return true;
  },
};
