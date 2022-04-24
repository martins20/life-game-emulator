import { Category } from "@shared/modules/category/entities/Category";

import { CreatePlayerCategoryDTO } from "../dtos/create-player-category";
import { BuyBuildingCondictionResponseCallbackDTO } from "../dtos/buy-property-condiction-callback";

export class PlayerCategory extends Category {
  buyBuildingCondictionResponseCallback: BuyBuildingCondictionResponseCallbackDTO;

  constructor(data: CreatePlayerCategoryDTO) {
    super({ name: data.name });

    Object.assign(this, data);
  }
}
