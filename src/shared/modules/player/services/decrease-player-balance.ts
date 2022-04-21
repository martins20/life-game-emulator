import { inject, injectable } from "tsyringe";

import { PlayerRepositoryContract } from "../repositories/contract/player-repository";
import { PlayerErrors } from "../errors/player";
import { Player } from "../entities/Player";
import { DecreasePlayerBalanceDTO } from "../dtos/decrease-player-balance";

@injectable()
export class DecreasePlayerBalanceService {
  constructor(
    @inject("PlayersRepository")
    private playersRepository: PlayerRepositoryContract
  ) {}

  async execute(data: DecreasePlayerBalanceDTO): Promise<Player> {
    const foundPlayerById = await this.playersRepository.findById(
      data.player_id
    );

    if (!foundPlayerById) throw new PlayerErrors.PlayerNotExistsError();

    const playerWithUpdatedBalace =
      await this.playersRepository.decreasePlayerBalance(data);

    return playerWithUpdatedBalace;
  }
}
