import { inject, injectable } from "tsyringe";

import { BoardRepositoryContract } from "../repositories/contract/board-repository";
import { BoardErrors } from "../errors/board";
import { Board } from "../entities/Board";
import { CreateBoardDTO } from "../dtos/create-board";

@injectable()
export class CreateBoardService {
  constructor(
    @inject("BoardsRepository")
    private boardsRepository: BoardRepositoryContract
  ) {}

  async execute(data: CreateBoardDTO): Promise<Board> {
    const hasBoardPlayers = data.players.length;
    const hasBoardBuildings = data.buildings.length;

    if (!hasBoardPlayers)
      throw new BoardErrors.CannotCreateBoardWithoutPlayersError();

    if (!hasBoardBuildings)
      throw new BoardErrors.CannotCreateBoardWithoutBuildingsError();

    const board = this.boardsRepository.create(data);

    return board;
  }
}
