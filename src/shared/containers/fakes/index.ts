import { container } from "tsyringe";
import { FakeGameRepository } from "@modules/game/repositories/fakes/game";
import { FakeBoardRepository } from "@modules/game/repositories/fakes/board";
import { GameRepositoryContract } from "@modules/game/repositories/contract/game-repository";
import { BoardRepositoryContract } from "@modules/game/repositories/contract/board-repository";

import { FakePlayerRepository } from "@shared/modules/player/repositories/fakes/player";
import { PlayerRepositoryContract } from "@shared/modules/player/repositories/contract/player-repository";
import { FakePlayerCategoryRepository } from "@shared/modules/category/modules/player-category/repositories/fakes/player-category";
import { PlayerCategoryRepositoryContract } from "@shared/modules/category/modules/player-category/repositories/contract/player-category-repository";
import { FakeBuildingRepository } from "@shared/modules/building/repositories/fakes/building";
import { BuildingRepositoryContract } from "@shared/modules/building/repositories/contract/building-repository";

container.registerSingleton<PlayerRepositoryContract>(
  "PlayersRepository",
  FakePlayerRepository
);

container.registerSingleton<BuildingRepositoryContract>(
  "BuildingsRepository",
  FakeBuildingRepository
);

container.registerSingleton<PlayerCategoryRepositoryContract>(
  "PlayerCategoriesRepository",
  FakePlayerCategoryRepository
);

container.registerSingleton<BoardRepositoryContract>(
  "BoardsRepository",
  FakeBoardRepository
);

container.registerSingleton<GameRepositoryContract>(
  "GamesRepository",
  FakeGameRepository
);
