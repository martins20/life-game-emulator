import { CreatePlayerCategoryDTO } from "../dtos/create-player-category";
import { BuyBuildingCondictionsParamDTO } from "../dtos/buy-property-condictions-param";

export const RANDOM_PLAYER_CATEGORY: CreatePlayerCategoryDTO = {
  name: "random",
  buyBuildingCondictionResponseCallback: (
    _: BuyBuildingCondictionsParamDTO
  ): boolean => {
    const codiction = !!Math.round(Math.random());

    return codiction;
  },
};
