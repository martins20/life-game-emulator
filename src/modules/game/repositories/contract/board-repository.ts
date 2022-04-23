import { Board } from "@modules/game/entities/Board";
import { CreateBoardEntityDTO } from "@modules/game/dtos/create-board-entity";

export interface BoardRepositoryContract {
  create: (data: CreateBoardEntityDTO) => Promise<Board>;
}
