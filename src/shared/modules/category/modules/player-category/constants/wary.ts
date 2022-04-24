import { CreatePlayerCategoryDTO } from "../dtos/create-player-category";
import { BuyBuildingCondictionsParamDTO } from "../dtos/buy-building-condictions-param";

export const WARY_PLAYER_CATEGORY: CreatePlayerCategoryDTO = {
  name: "wary",
  buyBuildingCondictionResponseCallback: ({
    sale_cost,
    player_balance,
  }: BuyBuildingCondictionsParamDTO): boolean => {
    const codiction = sale_cost - player_balance >= 80;

    return codiction;
  },
};
