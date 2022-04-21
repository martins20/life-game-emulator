import { PlayerCategory } from "./PlayerCategory";
import { CreatePlayerCategoryDTO } from "../dtos/create-player-category";
import { BuyPropertyCondictionsParamDTO } from "../dtos/buy-property-condictions-param";

const makePlayerCategory = (data: CreatePlayerCategoryDTO): PlayerCategory => {
  const character = new PlayerCategory(data);

  return character;
};

const mockBuyPropertyCondictionResponseCallback = ({
  player_balance,
  sale_cost,
}: BuyPropertyCondictionsParamDTO): boolean => {
  const shouldPlayerBuyProperty = player_balance > sale_cost;

  return shouldPlayerBuyProperty;
};

describe("PlayerCategory entity", () => {
  const characterData: CreatePlayerCategoryDTO = {
    name: "player-category-test",
    buyPropertyCondictionResponseCallback:
      mockBuyPropertyCondictionResponseCallback,
  };

  it("Should creates a player category", () => {
    const playerType = makePlayerCategory(characterData);

    expect(playerType).toMatchObject(characterData);
  });

  it("Should return 'buyPropertyCondictionResponseCallback' response by running it", () => {
    makePlayerCategory(characterData);

    const response = mockBuyPropertyCondictionResponseCallback({
      player_balance: 10,
      sale_cost: 1,
      rent_value: 1,
    });

    expect(response).toBeTruthy();
  });
});
