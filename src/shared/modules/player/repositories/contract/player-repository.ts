import { Player } from "@shared/modules/player/entities/Player";
import { IncreasePlayerBalanceDTO } from "@shared/modules/player/dtos/increase-player-balance";
import { DecreasePlayerBalanceDTO } from "@shared/modules/player/dtos/decrease-player-balance";
import { CreatePlayerDTO } from "@shared/modules/player/dtos/create-player";

import { MovePlayerForwardDTO } from "../../dtos/move-player-forward";

export interface PlayerRepositoryContract {
  create: (data: CreatePlayerDTO) => Promise<Player>;
  findByPlayerName: (name: Player["name"]) => Promise<Player | undefined>;
  findById: (playerID: Player["id"]) => Promise<Player | undefined>;
  increasePlayerBalance: (data: IncreasePlayerBalanceDTO) => Promise<Player>;
  decreasePlayerBalance: (data: DecreasePlayerBalanceDTO) => Promise<Player>;
  moveForward: (data: MovePlayerForwardDTO) => Promise<Player>;
}
