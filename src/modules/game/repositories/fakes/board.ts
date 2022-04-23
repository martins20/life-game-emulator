import { Board } from "@modules/game/entities/Board";
import { CreateBoardEntityDTO } from "@modules/game/dtos/create-board-entity";

import { BoardRepositoryContract } from "../contract/board-repository";

export class FakeBoardRepository implements BoardRepositoryContract {
  private boards: Board[] = [];

  async create(data: CreateBoardEntityDTO): Promise<Board> {
    const board = new Board(data);

    Object.assign(board, {
      id: String(Date.now() * this.boards.length + 1),
    });

    this.boards.push(board);

    return board;
  }

  async findById(board_id: string): Promise<Board | undefined> {
    const foundBoard = this.boards.find((board) => board.id === board_id);

    return foundBoard;
  }
}
