import { inject, injectable } from "tsyringe";

import { GameRepositoryContract } from "../repositories/contract/game-repository";
import { BoardRepositoryContract } from "../repositories/contract/board-repository";
import { BoardErrors } from "../errors/board";
import { Game } from "../entities/Game";
import { CreateGameDTO } from "../dtos/create-game";

@injectable()
export class CreateGameService {
  constructor(
    @inject("GamesRepository")
    private gamesRepository: GameRepositoryContract,
    @inject("BoardsRepository")
    private boardsRepository: BoardRepositoryContract
  ) {}

  async execute({ board_id }: CreateGameDTO): Promise<Game> {
    const foundBoard = await this.boardsRepository.findById(board_id);

    if (!foundBoard) throw new BoardErrors.BoardNotExistsError();

    const game = await this.gamesRepository.create({ board: foundBoard });

    return game;
  }
}
