import { Property } from "@shared/modules/property/entities/Property";
import { Player } from "@shared/modules/player/entities/Player";

export interface CreateBoardEntityDTO {
  players: Player[];
  buildings: Property[];
}
