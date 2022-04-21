import { container } from "tsyringe";
import { FakePropertyRepository } from "@modules/property/repositories/fakes/property";
import { PropertyRepositoryContract } from "@modules/property/repositories/contract/property-repository";
import { FakePlayerRepository } from "@modules/player/repositories/fakes/player";
import { PlayerRepositoryContract } from "@modules/player/repositories/contract/player-repository";
import { FakePlayerCategoryRepository } from "@modules/category/modules/player-category/repositories/fakes/player-category";
import { PlayerCategoryRepositoryContract } from "@modules/category/modules/player-category/repositories/contract/player-category-repository";

container.registerSingleton<PlayerRepositoryContract>(
  "PlayersRepository",
  FakePlayerRepository
);

container.registerSingleton<PropertyRepositoryContract>(
  "PropertiesRepository",
  FakePropertyRepository
);

container.registerSingleton<PlayerCategoryRepositoryContract>(
  "PlayerCategoriesRepository",
  FakePlayerCategoryRepository
);
