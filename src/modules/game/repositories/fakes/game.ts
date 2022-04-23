import { Game } from "@modules/game/entities/Game";
import { CreateGameEntityDTO } from "@modules/game/dtos/create-game-entity";

import { GameRepositoryContract } from "../contract/game-repository";

export class FakeGameRepository implements GameRepositoryContract {
  private games: Game[] = [];

  async create(data: CreateGameEntityDTO): Promise<Game> {
    const game = new Game(data);

    Object.assign(game, { id: String(Date.now() * this.games.length + 1) });

    this.games.push(game);

    return game;
  }
}
