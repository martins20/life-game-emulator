import { PlayerCategoryRepositoryContract } from "../contract/player-category-repository";
import { PlayerCategory } from "../../entities/PlayerCategory";
import { CreatePlayerCategoryDTO } from "../../dtos/create-player-category";

export class FakePlayerCategoryRepository
  implements PlayerCategoryRepositoryContract
{
  private playerCategories: PlayerCategory[] = [
    {
      id: "some-id",
      name: "integration-test–category-name",
      buyBuildingCondictionResponseCallback: () => true,
    },
  ];

  async create(data: CreatePlayerCategoryDTO): Promise<PlayerCategory> {
    const playerCategories = new PlayerCategory(data);

    Object.assign(playerCategories, {
      id: String(Date.now() + this.playerCategories.length + 1),
    });

    this.playerCategories.push(playerCategories);

    return playerCategories;
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
