import { Player } from "@modules/player/entities/Player";
import { IncreasePlayerBalanceDTO } from "@modules/player/dtos/increase-player-balance";
import { CreatePlayerDTO } from "@modules/player/dtos/create-player";

export interface PlayerRepositoryContract {
  create: (data: CreatePlayerDTO) => Promise<Player>;
  findByPlayerName: (name: Player["name"]) => Promise<Player | undefined>;
  findById: (playerID: Player["id"]) => Promise<Player | undefined>;
  updatePlayerBalance: (data: IncreasePlayerBalanceDTO) => Promise<Player>;
}
