import { Characteristic } from "./Characteristic";
import { CreateCharacterDTO } from "../dtos/create-character";
import { BuyPropertyCondictionsParamDTO } from "../dtos/buy-property-condictions-param";

const makeCharacteristic = (data: CreateCharacterDTO): Characteristic => {
  const character = new Characteristic(data);

  return character;
};

const mockBuyPropertyCondictionResponseCallback = ({
  player_balance,
  sale_cost,
}: BuyPropertyCondictionsParamDTO): boolean => {
  const shouldPlayerBuyProperty = player_balance > sale_cost;

  return shouldPlayerBuyProperty;
};

describe("Characteristic entity", () => {
  const characterData: CreateCharacterDTO = {
    name: "characteristic-test",
    buyPropertyCondictionResponseCallback:
      mockBuyPropertyCondictionResponseCallback,
  };

  it("Should creates a Characteristic", () => {
    const characteristic = makeCharacteristic(characterData);

    expect(characteristic).toMatchObject(characterData);
  });

  it("Should return 'buyPropertyCondictionResponseCallback' response by running it", () => {
    makeCharacteristic(characterData);

    const response = mockBuyPropertyCondictionResponseCallback({
      player_balance: 10,
      sale_cost: 1,
      rent_value: 1,
    });

    expect(response).toBeTruthy();
  });
});
