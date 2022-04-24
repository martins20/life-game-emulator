import { Board } from "./Board";
import { CreateGameEntityDTO } from "../dtos/create-game-entity";
import { MAX_GAME_ROUNDS } from "../constants/max-game-rounds";

export class Game {
  id: string;
  round = 0;
  board: Board;
  max_rounds: number = MAX_GAME_ROUNDS;
  is_game_finished = false;

  constructor(data: CreateGameEntityDTO) {
    Object.assign(this, data);
  }
}
