import { Player } from "@modules/player/entities/Player";

export interface SetPropertyOwnerDTO {
  property_id: number;
  owner: Player;
}
