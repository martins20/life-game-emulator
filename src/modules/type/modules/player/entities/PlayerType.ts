import { Type } from "@modules/type/entities/Type";

import { CreatePlayerTypeDTO } from "../dtos/create-player-type";
import { BuyPropertyCondictionResponseCallbackDTO } from "../dtos/buy-property-condiction-callback";

export class PlayerType extends Type {
  buyPropertyCondictionResponseCallback: BuyPropertyCondictionResponseCallbackDTO;

  constructor(data: CreatePlayerTypeDTO) {
    super({ name: data.name });

    Object.assign(this, data);
  }
}
