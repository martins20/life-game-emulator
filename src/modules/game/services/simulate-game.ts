import { inject, injectable } from "tsyringe";

import { PlayerRepositoryContract } from "@shared/modules/player/repositories/contract/player-repository";
import { BuildingRepositoryContract } from "@shared/modules/building/repositories/contract/building-repository";

import { GameRepositoryContract } from "../repositories/contract/game-repository";
import { BoardRepositoryContract } from "../repositories/contract/board-repository";
import { GameErrors } from "../errors/game";
import { Game } from "../entities/Game";
import { SimulateGameDTO } from "../dtos/simulate-game";

@injectable()
export class SimulateGameService {
  constructor(
    @inject("GamesRepository")
    private gamesRepository: GameRepositoryContract,
    @inject("BoardsRepository")
    private boardsRepository: BoardRepositoryContract,
    @inject("PlayersRepository")
    private playersRepository: PlayerRepositoryContract,
    @inject("BuildingsRepository")
    private buildinsRepository: BuildingRepositoryContract
  ) {}

  async execute({ game_id }: SimulateGameDTO): Promise<Game> {
    const foundGameById = await this.gamesRepository.findById(game_id);

    if (!foundGameById) throw new GameErrors.GameNotExistsError();

    const isGameWithMoreThanOnePlayer = foundGameById.board.players.length > 1;

    if (!isGameWithMoreThanOnePlayer)
      throw new GameErrors.CannotSimulateGameWithOnePlayer();

    return {} as Game;
  }
}
