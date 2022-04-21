import { Player } from "@modules/player/entities/Player";
import { CreatePlayerDTO } from "@modules/player/dtos/create-player";

import { PlayerRepositoryContract } from "../contract/player-repository";

export class FakePlayerRepository implements PlayerRepositoryContract {
  private players: Player[] = [];

  async create(data: CreatePlayerDTO): Promise<Player> {
    const createdPlayer = new Player(data.name);

    Object.assign(createdPlayer, {
      id: String(Date.now() * this.players.length + 1),
    });

    this.players.push(createdPlayer);

    return createdPlayer;
  }

  async findByPlayerName(name: Player["name"]): Promise<Player | undefined> {
    const lowerCaseName = name.toLocaleLowerCase();

    const foundPlayer = this.players.find(
      (data) => data.name.toLocaleLowerCase() === lowerCaseName
    );

    return foundPlayer;
  }
}
