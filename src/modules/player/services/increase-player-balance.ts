import { inject, injectable } from "tsyringe";

import { PlayerRepositoryContract } from "../repositories/contract/player-repository";
import { PlayerErrors } from "../errors/player";
import { Player } from "../entities/Player";
import { IncreasePlayerBalanceDTO } from "../dtos/increase-player-balance";

@injectable()
export class IncreasePlayerBalanceService {
  constructor(
    @inject("PlayersRepository")
    private playersRepository: PlayerRepositoryContract
  ) {}

  async execute(data: IncreasePlayerBalanceDTO): Promise<Player> {
    const foundPlayerById = await this.playersRepository.findById(
      data.player_id
    );

    if (!foundPlayerById) throw new PlayerErrors.PlayerNotExistsError();

    const playerWithUpdatedBalace =
      await this.playersRepository.updatePlayerBalance(data);

    return playerWithUpdatedBalace;
  }
}
