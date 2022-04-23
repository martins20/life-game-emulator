import { Property } from "@shared/modules/property/entities/Property";
import { Player } from "@shared/modules/player/entities/Player";

import { CreateBoardEntityDTO } from "../dtos/create-board-entity";

export class Board {
  id: string;

  buildings: Property[];
  players: Player[];

  constructor(data: CreateBoardEntityDTO) {
    Object.assign(this, data);
  }
}
