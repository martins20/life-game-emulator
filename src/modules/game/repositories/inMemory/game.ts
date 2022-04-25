import { Game } from "@modules/game/entities/Game";
import { CreateGameEntityDTO } from "@modules/game/dtos/create-game-entity";

import { GameRepositoryContract } from "../contract/game-repository";

export class InMemoryGameRepository implements GameRepositoryContract {
  private games: Game[] = [];

  async create(data: CreateGameEntityDTO): Promise<Game> {
    const game = new Game(data);

    Object.assign(game, { id: String(Date.now() * this.games.length + 1) });

    this.games.push(game);

    return game;
  }

  async findById(game_id: Game["id"]): Promise<Game | undefined> {
    const foundGame = this.games.find((game) => game.id === game_id);

    return foundGame;
  }

  async finishGame(game_id: Game["id"]): Promise<Game> {
    const updatedGames = this.games.map((data) =>
      data.id === game_id
        ? {
            ...data,
            is_game_finished: true,
          }
        : data
    );

    this.games = updatedGames;

    const updatedGame = await this.findById(game_id);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return updatedGame!;
  }
}
