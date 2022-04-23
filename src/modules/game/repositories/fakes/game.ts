import { Game } from "@modules/game/entities/Game";
import { CreateGameDTO } from "@modules/game/dtos/create-game";

import { GameRepositoryContract } from "../contract/game-repository";

export class FakeGameRepository implements GameRepositoryContract {
  private games: Game[] = [];

  async create(data: CreateGameDTO): Promise<Game> {
    const game = new Game(data);

    Object.assign(game, { id: String(Date.now() * this.games.length + 1) });

    this.games.push(game);

    return game;
  }
}
