import { container } from "tsyringe";

import { FakePropertyRepository } from "@shared/modules/property/repositories/fakes/property";
import { PropertyRepositoryContract } from "@shared/modules/property/repositories/contract/property-repository";
import { FakePlayerRepository } from "@shared/modules/player/repositories/fakes/player";
import { PlayerRepositoryContract } from "@shared/modules/player/repositories/contract/player-repository";
import { FakePlayerCategoryRepository } from "@shared/modules/category/modules/player-category/repositories/fakes/player-category";
import { PlayerCategoryRepositoryContract } from "@shared/modules/category/modules/player-category/repositories/contract/player-category-repository";

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
