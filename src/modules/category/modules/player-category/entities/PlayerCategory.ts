import { Category } from "@modules/category/entities/Category";

import { CreatePlayerCategoryDTO } from "../dtos/create-player-category";
import { BuyPropertyCondictionResponseCallbackDTO } from "../dtos/buy-property-condiction-callback";

export class PlayerCategory extends Category {
  buyPropertyCondictionResponseCallback: BuyPropertyCondictionResponseCallbackDTO;

  constructor(data: CreatePlayerCategoryDTO) {
    super({ name: data.name });

    Object.assign(this, data);
  }
}
