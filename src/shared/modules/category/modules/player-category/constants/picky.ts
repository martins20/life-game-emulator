import { CreatePlayerCategoryDTO } from "../dtos/create-player-category";
import { BuyBuildingCondictionsParamDTO } from "../dtos/buy-building-condictions-param";

export const PICKY_PLAYER_CATEGORY: CreatePlayerCategoryDTO = {
  name: "picky",
  buyBuildingCondictionResponseCallback: ({
    rent_value,
  }: BuyBuildingCondictionsParamDTO): boolean => {
    const codiction = rent_value > 50;

    return codiction;
  },
};
