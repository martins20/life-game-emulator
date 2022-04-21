import { inject, injectable } from "tsyringe";

import { PlayerRepositoryContract } from "../repositories/contract/player-repository";
import { Player } from "../entities/Player";
import { CreatePlayerDTO } from "../dtos/create-player";

@injectable()
export class CreatePlayerService {
  constructor(
    @inject("PlayersRepository")
    private playersRepository: PlayerRepositoryContract
  ) {}

  async execute(data: CreatePlayerDTO): Promise<Player> {
    const player = await this.playersRepository.create(data);

    return player;
  }
}
