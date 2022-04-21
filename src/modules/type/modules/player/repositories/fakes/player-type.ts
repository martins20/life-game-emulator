import { PlayerTypeRepositoryContract } from "../contract/player-type-repository";
import { PlayerType } from "../../entities/PlayerType";
import { CreatePlayerTypeDTO } from "../../dtos/create-player-type";

export class FakePlayerTypeRepository implements PlayerTypeRepositoryContract {
  private playerType: PlayerType[] = [];

  async create(data: CreatePlayerTypeDTO): Promise<PlayerType> {
    const playerType = new PlayerType(data);

    Object.assign(playerType, {
      ...data,
      id: String(Date.now() + this.playerType.length + 1),
    });

    this.playerType.push(playerType);

    return playerType;
  }
}
