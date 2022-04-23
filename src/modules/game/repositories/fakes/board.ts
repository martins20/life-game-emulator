import { Board } from "@modules/game/entities/Board";
import { CreateBoardDTO } from "@modules/game/dtos/create-board";

import { BoardRepositoryContract } from "../contract/board-repository";

export class FakeBoardRepository implements BoardRepositoryContract {
  private boards: Board[] = [];

  async create(data: CreateBoardDTO): Promise<Board> {
    const board = new Board(data);

    Object.assign(board, {
      ...board,
      id: String(Date.now() * this.boards.length + 1),
    });

    this.boards.push(board);

    return board;
  }
}
