import { Player } from "@shared/modules/player/entities/Player";
import { Building } from "@shared/modules/building/entities/Building";

import { CreateBoardEntityDTO } from "../dtos/create-board-entity";

export class Board {
  id: string;

  buildings: Building[];
  players: Player[];

  constructor(data: CreateBoardEntityDTO) {
    Object.assign(this, data);
  }
}
