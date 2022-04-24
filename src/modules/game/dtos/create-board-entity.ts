import { Player } from "@shared/modules/player/entities/Player";
import { Building } from "@shared/modules/building/entities/Building";

export interface CreateBoardEntityDTO {
  players: Player[];
  buildings: Building[];
}
