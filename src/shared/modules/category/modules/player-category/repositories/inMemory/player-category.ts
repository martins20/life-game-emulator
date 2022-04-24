import { PlayerCategoryRepositoryContract } from "../contract/player-category-repository";
import { PlayerCategory } from "../../entities/PlayerCategory";
import { CreatePlayerCategoryDTO } from "../../dtos/create-player-category";
import { DEFAULT_PLAYER_CATEGORIES } from "../../constants";

export class InMemoryPlayerCategoryRepository
  implements PlayerCategoryRepositoryContract
{
  constructor() {
    this.runSeeds();
  }

  private async runSeeds(): Promise<void> {
    await Promise.all(
      DEFAULT_PLAYER_CATEGORIES.map((data) => this.create(data))
    );
  }

  private playerCategories: PlayerCategory[] = [];

  async create(data: CreatePlayerCategoryDTO): Promise<PlayerCategory> {
    const playerType = new PlayerCategory(data);

    Object.assign(playerType, {
      id: String(Date.now() + this.playerCategories.length + 1),
    });

    this.playerCategories.push(playerType);

    return playerType;
  }

  async findByPlayerCategoryName(
    name: PlayerCategory["name"]
  ): Promise<PlayerCategory | undefined> {
    const lowerCaseName = name.toLocaleLowerCase();

    const foundPlayerType = this.playerCategories.find(
      (data) => data.name.toLocaleLowerCase() === lowerCaseName
    );

    return foundPlayerType;
  }
}
