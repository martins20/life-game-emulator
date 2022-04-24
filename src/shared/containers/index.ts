import { container } from "tsyringe";

import { InMemoryPlayerRepository } from "@shared/modules/player/repositories/inMemory/player";
import { PlayerRepositoryContract } from "@shared/modules/player/repositories/contract/player-repository";
import { InMemoryPlayerCategoryRepository } from "@shared/modules/category/modules/player-category/repositories/inMemory/player-category";
import { PlayerCategoryRepositoryContract } from "@shared/modules/category/modules/player-category/repositories/contract/player-category-repository";
import { InMemoryBuildingRepository } from "@shared/modules/building/repositories/inMemory/building";
import { BuildingRepositoryContract } from "@shared/modules/building/repositories/contract/building-repository";

container.registerSingleton<PlayerRepositoryContract>(
  "PlayersRepository",
  InMemoryPlayerRepository
);

container.registerSingleton<BuildingRepositoryContract>(
  "PropertiesRepository",
  InMemoryBuildingRepository
);

container.registerSingleton<PlayerCategoryRepositoryContract>(
  "PlayerCategoriesRepository",
  InMemoryPlayerCategoryRepository
);
