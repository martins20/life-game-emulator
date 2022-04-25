import { Player } from "@shared/modules/player/entities/Player";

export interface SimulateGameResponseDTO {
  winner: Player["name"];
  players: Player["name"][];
}
