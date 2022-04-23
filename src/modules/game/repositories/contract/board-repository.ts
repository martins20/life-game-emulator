import { Board } from "@modules/game/entities/Board";
import { CreateBoardDTO } from "@modules/game/dtos/create-board";

export interface BoardRepositoryContract {
  create: (data: CreateBoardDTO) => Promise<Board>;
}
