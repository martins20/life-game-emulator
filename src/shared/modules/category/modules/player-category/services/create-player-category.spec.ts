import { CreatePlayerCategoryService as Sut } from "./create-player-category";
import { FakePlayerCategoryRepository } from "../repositories/fakes/player-category";
import { PlayerCategoryErrors } from "../errors/player-category";
import { CreatePlayerCategoryDTO } from "../dtos/create-player-category";

let sut: Sut;
let fakePlayerCategoryRepository: FakePlayerCategoryRepository;

describe("CreatePlayerCategoryService", () => {
  beforeEach(() => {
    fakePlayerCategoryRepository = new FakePlayerCategoryRepository();
    sut = new Sut(fakePlayerCategoryRepository);
  });

  const playerCategoryData: CreatePlayerCategoryDTO = {
    name: "player-category-test",
    buyPropertyCondictionResponseCallback: jest.fn(),
  };

  it("Should be able to creates a new player category", async () => {
    const playerCategory = await sut.execute(playerCategoryData);

    expect(playerCategory).toHaveProperty("id");
    expect(playerCategory).toMatchObject(playerCategoryData);
  });

  it("Should not be able to create a new player category if player category name already exists", async () => {
    await fakePlayerCategoryRepository.create(playerCategoryData);

    await expect(sut.execute(playerCategoryData)).rejects.toBeInstanceOf(
      PlayerCategoryErrors.PlayerCategoryNameAlreadyExistsError
    );
  });
});
