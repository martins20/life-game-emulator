import { FakePlayerRepository } from "@shared/modules/player/repositories/fakes/player";
import { PlayerErrors } from "@shared/modules/player/errors/player";
import { Player } from "@shared/modules/player/entities/Player";

import { SetPlayerCategoryService as Sut } from "./set-player-category";
import { FakePlayerCategoryRepository } from "../../category/modules/player-category/repositories/fakes/player-category";
import { PlayerCategoryErrors } from "../../category/modules/player-category/errors/player-category";
import { PlayerCategory } from "../../category/modules/player-category/entities/PlayerCategory";
import { RANDOM_PLAYER_CATEGORY } from "../../category/modules/player-category/constants/random";

let sut: Sut;
let player: Player;
let category: PlayerCategory;
let fakePlayerRepository: FakePlayerRepository;
let fakePlayerCategoryRepository: FakePlayerCategoryRepository;

describe("SetPlayerCategoryService", () => {
  beforeEach(async () => {
    fakePlayerRepository = new FakePlayerRepository();
    fakePlayerCategoryRepository = new FakePlayerCategoryRepository();

    player = await fakePlayerRepository.create({ name: "John Doe" });
    category = await fakePlayerCategoryRepository.create(
      RANDOM_PLAYER_CATEGORY
    );

    sut = new Sut(fakePlayerCategoryRepository, fakePlayerRepository);
  });

  it("Should not be able to set a player category with a non existent player", async () => {
    await expect(
      sut.execute({
        player_id: "non-existent-player",
        category_name: category.name,
      })
    ).rejects.toBeInstanceOf(PlayerErrors.PlayerNotExistsError);
  });

  it("Should not be able to set a player category with a non existent category", async () => {
    await expect(
      sut.execute({
        player_id: player.id,
        category_name: "non-existent-category-name",
      })
    ).rejects.toBeInstanceOf(PlayerCategoryErrors.PlayerCategoryNotExistsError);
  });

  it("Should be able to set a player category", async () => {
    const updatedPlayer = await sut.execute({
      player_id: player.id,
      category_name: category.name,
    });

    expect(updatedPlayer).toMatchObject({
      ...player,
      category,
    });
  });
});
