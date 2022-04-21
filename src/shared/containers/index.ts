import { container } from "tsyringe";

import { InMemoryPropertyRepository } from "@shared/modules/property/repositories/inMemory/property";
import { PropertyRepositoryContract } from "@shared/modules/property/repositories/contract/property-repository";
import { InMemoryPlayerRepository } from "@shared/modules/player/repositories/inMemory/player";
import { PlayerRepositoryContract } from "@shared/modules/player/repositories/contract/player-repository";
import { InMemoryPlayerCategoryRepository } from "@shared/modules/category/modules/player-category/repositories/inMemory/player-category";
import { PlayerCategoryRepositoryContract } from "@shared/modules/category/modules/player-category/repositories/contract/player-category-repository";

container.registerSingleton<PlayerRepositoryContract>(
  "PlayersRepository",
  InMemoryPlayerRepository
);

container.registerSingleton<PropertyRepositoryContract>(
  "PropertiesRepository",
  InMemoryPropertyRepository
);

container.registerSingleton<PlayerCategoryRepositoryContract>(
  "PlayerCategoriesRepository",
  InMemoryPlayerCategoryRepository
);
