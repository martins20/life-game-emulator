import { inject, injectable } from "tsyringe";

import { PlayerTypeRepositoryContract } from "../repositories/contract/player-type-repository";
import { PlayerTypeErrors } from "../errors/player-type";
import { PlayerType } from "../entities/PlayerType";
import { CreatePlayerTypeDTO } from "../dtos/create-player-type";

@injectable()
export class CreatePlayerTypeService {
  constructor(
    @inject("PlayerTypesRepository")
    private playerTypesRepository: PlayerTypeRepositoryContract
  ) {}

  async execute(data: CreatePlayerTypeDTO): Promise<PlayerType> {
    const foundPlayerTypeByName =
      await this.playerTypesRepository.findByPlayerTypeName(data.name);

    if (foundPlayerTypeByName)
      throw new PlayerTypeErrors.PlayerTypeNameAlreadyExistsError();

    const playerType = await this.playerTypesRepository.create(data);

    return playerType;
  }
}
