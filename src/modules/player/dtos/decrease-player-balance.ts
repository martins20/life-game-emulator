import { Player } from "../entities/Player";

export interface DecreasePlayerBalanceDTO {
  player_id: Player["name"];
  value: -Player["balance"];
}
