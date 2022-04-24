import { Game } from "../entities/Game";
import { SimulateGameDTO } from "../dtos/simulate-game";

export class SimulateGameService {
  async execute(_: SimulateGameDTO): Promise<Game> {
    return {} as Game;
  }
}
