import { Player } from "@shared/modules/player/entities/Player";

import { CreateBuildingDTO } from "../dtos/create-building";

export class Building {
  id: number;
  name: string;
  sale_cost: number;
  rent_cost: number;
  owner: Player | null = null;

  constructor(data: CreateBuildingDTO) {
    Object.assign(this, data);
  }
}
