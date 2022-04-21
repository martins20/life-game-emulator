import { inject, injectable } from "tsyringe";

import { PlayerRepositoryContract } from "../repositories/contract/player-repository";
import { PlayerErrors } from "../errors/player";
import { Player } from "../entities/Player";
import { MovePlayerForwardDTO } from "../dtos/move-player-forward";

@injectable()
export class MovePlayerForwardService {
  constructor(
    @inject("PlayersRepository")
    private playersRepository: PlayerRepositoryContract
  ) {}

  async execute(data: MovePlayerForwardDTO): Promise<Player> {
    const foundPlayerById = await this.playersRepository.findById(
      data.player_id
    );

    if (!foundPlayerById) throw new PlayerErrors.PlayerNotExistsError();

    const movedPlayerPosition = await this.playersRepository.moveForward(data);

    return movedPlayerPosition;
  }
}
