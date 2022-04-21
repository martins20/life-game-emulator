import { PlayerType } from "./PlayerType";
import { CreatePlayerTypeDTO } from "../dtos/create-player-type";
import { BuyPropertyCondictionsParamDTO } from "../dtos/buy-property-condictions-param";

const makePlayerType = (data: CreatePlayerTypeDTO): PlayerType => {
  const character = new PlayerType(data);

  return character;
};

const mockBuyPropertyCondictionResponseCallback = ({
  player_balance,
  sale_cost,
}: BuyPropertyCondictionsParamDTO): boolean => {
  const shouldPlayerBuyProperty = player_balance > sale_cost;

  return shouldPlayerBuyProperty;
};

describe("PlayerType entity", () => {
  const characterData: CreatePlayerTypeDTO = {
    name: "player-type-test",
    buyPropertyCondictionResponseCallback:
      mockBuyPropertyCondictionResponseCallback,
  };

  it("Should creates a player type", () => {
    const playerType = makePlayerType(characterData);

    expect(playerType).toMatchObject(characterData);
  });

  it("Should return 'buyPropertyCondictionResponseCallback' response by running it", () => {
    makePlayerType(characterData);

    const response = mockBuyPropertyCondictionResponseCallback({
      player_balance: 10,
      sale_cost: 1,
      rent_value: 1,
    });

    expect(response).toBeTruthy();
  });
});
