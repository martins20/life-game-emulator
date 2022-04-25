import { inject, injectable } from "tsyringe";

import { PlayerRepositoryContract } from "../repositories/contract/player-repository";
import { Player } from "../entities/Player";

@injectable()
export class ListPlayersService {
  constructor(
    @inject("PlayersRepository")
    private playersRepository: PlayerRepositoryContract
  ) {}

  async execute(): Promise<Player[]> {
    const players = await this.playersRepository.list();

    return players;
  }
}
