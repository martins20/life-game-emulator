import { Player } from "@shared/modules/player/entities/Player";

export interface SetPropertyOwnerDTO {
  property_id: number;
  owner: Player;
}
