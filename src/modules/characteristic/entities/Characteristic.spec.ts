import { Characteristic } from "./Characteristic";
import { CreateCharacterDTO } from "../dtos/create-character";

const makeCharacteristic = (data: CreateCharacterDTO): Characteristic => {
  const character = new Characteristic(data);

  return character;
};

const mockBuyPropertyCondictionResponseCallback = jest.fn();

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

    mockBuyPropertyCondictionResponseCallback.mockImplementationOnce(
      () => true
    );

    const response = mockBuyPropertyCondictionResponseCallback();

    expect(response).toBeTruthy();
  });
});
