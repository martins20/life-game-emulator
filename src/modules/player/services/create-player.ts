import { inject, injectable } from "tsyringe";

import { PlayerRepositoryContract } from "../repositories/contract/player-repository";
import { PlayerErrors } from "../errors/player";
import { Player } from "../entities/Player";
import { CreatePlayerDTO } from "../dtos/create-player";

@injectable()
export class CreatePlayerService {
  constructor(
    @inject("PlayerRepository")
    private playerRepository: PlayerRepositoryContract
  ) {}

  async execute(data: CreatePlayerDTO): Promise<Player> {
    const foundPlayerWithSameName =
      await this.playerRepository.findByPlayerName(data.name);

    if (foundPlayerWithSameName)
      throw new PlayerErrors.PlayerAlreadyExistsError();

    const player = await this.playerRepository.create(data);

    return player;
  }
}
