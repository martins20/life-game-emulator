import { inject, injectable } from "tsyringe";

import { PlayerRepositoryContract } from "../repositories/contract/player-repository";
import { PlayerErrors } from "../errors/player";
import { Player } from "../entities/Player";
import { CreatePlayerDTO } from "../dtos/create-player";

@injectable()
export class CreatePlayerService {
  constructor(
    @inject("PlayersRepository")
    private playersRepository: PlayerRepositoryContract
  ) {}

  async execute(data: CreatePlayerDTO): Promise<Player> {
    if (!data.name) throw new PlayerErrors.PlayerNameIsRequiredError();

    const foundPlayerWithSameName =
      await this.playersRepository.findByPlayerName(data.name);

    if (foundPlayerWithSameName)
      throw new PlayerErrors.PlayerAlreadyExistsError();

    const player = await this.playersRepository.create(data);

    return player;
  }
}
