import { inject, injectable } from "tsyringe";

import { GameRepositoryContract } from "../repositories/contract/game-repository";
import { GameErrors } from "../errors/game";
import { Game } from "../entities/Game";
import { CreateGameDTO } from "../dtos/create-game";

@injectable()
export class CreateGameService {
  constructor(
    @inject("GamesRepository")
    private gamesRepository: GameRepositoryContract
  ) {}

  async execute(data: CreateGameDTO): Promise<Game> {
    if (!data.board) throw new GameErrors.CannotCreateGameWithoutBoardError();

    return {} as Game;
  }
}
