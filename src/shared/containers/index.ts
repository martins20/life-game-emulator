import { container } from "tsyringe";
import { InMemoryPropertyRepository } from "@modules/property/repositories/inMemory/property";
import { PropertyRepositoryContract } from "@modules/property/repositories/contract/property-repository";
import { InMemoryPlayerRepository } from "@modules/player/repositories/inMemory/player";
import { PlayerRepositoryContract } from "@modules/player/repositories/contract/player-repository";
import { InMemoryPlayerCategoryRepository } from "@modules/category/modules/player-category/repositories/inMemory/player-category";
import { PlayerCategoryRepositoryContract } from "@modules/category/modules/player-category/repositories/contract/player-category-repository";

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
