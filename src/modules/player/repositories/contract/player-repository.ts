import { Player } from "@modules/player/entities/Player";
import { IncreasePlayerBalanceDTO } from "@modules/player/dtos/increase-player-balance";
import { DecreasePlayerBalanceDTO } from "@modules/player/dtos/decrease-player-balance";
import { CreatePlayerDTO } from "@modules/player/dtos/create-player";

export interface PlayerRepositoryContract {
  create: (data: CreatePlayerDTO) => Promise<Player>;
  findByPlayerName: (name: Player["name"]) => Promise<Player | undefined>;
  findById: (playerID: Player["id"]) => Promise<Player | undefined>;
  increasePlayerBalance: (data: IncreasePlayerBalanceDTO) => Promise<Player>;
  decreasePlayerBalance: (data: DecreasePlayerBalanceDTO) => Promise<Player>;
}
