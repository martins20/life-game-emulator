import { Board } from "../entities/Board";

export interface CreateGameDTO {
  board_id: Board["id"];
}
