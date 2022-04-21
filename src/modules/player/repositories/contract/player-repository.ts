import { Player } from "@modules/player/entities/Player";
import { CreatePlayerDTO } from "@modules/player/dtos/create-player";

export interface PlayerRepositoryContract {
  create: (data: CreatePlayerDTO) => Promise<Player>;
  findByPlayerName: (name: Player["name"]) => Promise<Player | undefined>;
}
