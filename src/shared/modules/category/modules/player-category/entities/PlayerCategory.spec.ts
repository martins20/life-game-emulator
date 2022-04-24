import { PlayerCategory } from "./PlayerCategory";
import { CreatePlayerCategoryDTO } from "../dtos/create-player-category";
import { BuyBuildingCondictionsParamDTO } from "../dtos/buy-building-condictions-param";

const makePlayerCategory = (data: CreatePlayerCategoryDTO): PlayerCategory => {
  const character = new PlayerCategory(data);

  return character;
};

const mockBuyBuildingCondictionResponseCallback = ({
  player_balance,
  sale_cost,
}: BuyBuildingCondictionsParamDTO): boolean => {
  const shouldPlayerBuyBuilding = player_balance > sale_cost;

  return shouldPlayerBuyBuilding;
};

describe("PlayerCategory entity", () => {
  const characterData: CreatePlayerCategoryDTO = {
    name: "player-category-test",
    buyBuildingCondictionResponseCallback:
      mockBuyBuildingCondictionResponseCallback,
  };

  it("Should creates a player category", () => {
    const playerType = makePlayerCategory(characterData);

    expect(playerType).toMatchObject(characterData);
  });

  it("Should return 'buyBuildingCondictionResponseCallback' response by running it", () => {
    makePlayerCategory(characterData);

    const response = mockBuyBuildingCondictionResponseCallback({
      player_balance: 10,
      sale_cost: 1,
      rent_value: 1,
    });

    expect(response).toBeTruthy();
  });
});
