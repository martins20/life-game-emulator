import { Board } from "./Board";
import { CreateGameDTO } from "../dtos/create-game";
import { MAX_GAME_ROUNDS } from "../constants/max-game-rounds";

export class Game {
  id: string;
  round = 0;
  board: Board;
  max_rounds: number = MAX_GAME_ROUNDS;

  constructor(data: CreateGameDTO) {
    Object.assign(this, data);
  }
}
