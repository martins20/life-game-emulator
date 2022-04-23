import { PlayerCategoryRepositoryContract } from "../contract/player-category-repository";
import { PlayerCategory } from "../../entities/PlayerCategory";
import { CreatePlayerCategoryDTO } from "../../dtos/create-player-category";

export class InMemoryPlayerCategoryRepository
  implements PlayerCategoryRepositoryContract
{
  private playerTypes: PlayerCategory[] = [];

  async create(data: CreatePlayerCategoryDTO): Promise<PlayerCategory> {
    const playerType = new PlayerCategory(data);

    Object.assign(playerType, {
      id: String(Date.now() + this.playerTypes.length + 1),
    });

    this.playerTypes.push(playerType);

    return playerType;
  }

  async findByPlayerCategoryName(
    name: PlayerCategory["name"]
  ): Promise<PlayerCategory | undefined> {
    const lowerCaseName = name.toLocaleLowerCase();

    const foundPlayerType = this.playerTypes.find(
      (data) => data.name.toLocaleLowerCase() === lowerCaseName
    );

    return foundPlayerType;
  }
}
