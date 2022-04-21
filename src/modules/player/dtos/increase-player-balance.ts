import { Player } from "../entities/Player";

export interface IncreasePlayerBalanceDTO {
  player_id: Player["name"];
  value: Player["balance"];
}
