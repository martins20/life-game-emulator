import { Player } from "@shared/modules/player/entities/Player";
import { Building } from "@shared/modules/building/entities/Building";

export interface CreateBoardDTO {
  player_ids: Player["id"][];
  building_ids: Building["id"][];
}
