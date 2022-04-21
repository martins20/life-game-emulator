import { CreateCharacterDTO } from "../dtos/create-character";
import { BuyPropertyCondictionResponseCallback } from "../dtos/buy-property-condiction-callback";

export class Characteristic {
  id: string;
  name: string;

  buyPropertyCondictionResponseCallback: BuyPropertyCondictionResponseCallback;

  constructor(data: CreateCharacterDTO) {
    Object.assign(this, data);
  }
}
