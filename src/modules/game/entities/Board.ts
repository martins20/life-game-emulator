import { Property } from "@shared/modules/property/entities/Property";
import { Player } from "@shared/modules/player/entities/Player";

import { CreateBoardDTO } from "../dtos/create-board";

export class Board {
  id: string;

  buildings: Property[];
  players: Player[];

  constructor(data: CreateBoardDTO) {
    Object.assign(this, data);
  }
}
