import { Game } from "@modules/game/entities/Game";
import { CreateGameDTO } from "@modules/game/dtos/create-game";

export interface GameRepositoryContract {
  create: (data: CreateGameDTO) => Promise<Game>;
}
