import { Game } from "@modules/game/entities/Game";
import { CreateGameEntityDTO } from "@modules/game/dtos/create-game-entity";

export interface GameRepositoryContract {
  create: (data: CreateGameEntityDTO) => Promise<Game>;
}
