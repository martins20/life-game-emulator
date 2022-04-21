import { PlayerTypeRepositoryContract } from "../contract/player-type-repository";
import { PlayerType } from "../../entities/PlayerType";
import { CreatePlayerTypeDTO } from "../../dtos/create-player-type";

export class InMemoryPlayerTypeRepository
  implements PlayerTypeRepositoryContract
{
  private playerTypes: PlayerType[] = [];

  async create(data: CreatePlayerTypeDTO): Promise<PlayerType> {
    const playerType = new PlayerType(data);

    Object.assign(playerType, {
      ...data,
      id: String(Date.now() + this.playerTypes.length + 1),
    });

    this.playerTypes.push(playerType);

    return playerType;
  }

  async findByPlayerTypeName(
    name: PlayerType["name"]
  ): Promise<PlayerType | undefined> {
    const lowerCaseName = name.toLocaleLowerCase();

    const foundPlayerType = this.playerTypes.find(
      (data) => data.name.toLocaleLowerCase() === lowerCaseName
    );

    return foundPlayerType;
  }
}
