import { Player } from "@shared/modules/player/entities/Player";

export interface SetBuildingOwnerDTO {
  property_id: number;
  owner: Player;
}
