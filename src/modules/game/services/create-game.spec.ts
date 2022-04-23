import { CreateGameService as Sut } from "./create-game";
import { FakeGameRepository } from "../repositories/fakes/game";
import { GameErrors } from "../errors/game";

let sut: Sut;
let fakeGameRepository: FakeGameRepository;

describe("CreateGameService", () => {
  beforeEach(() => {
    fakeGameRepository = new FakeGameRepository();
    sut = new Sut(fakeGameRepository);
  });

  it("Should not be able to create a game without a board", async () => {
    await expect(
      sut.execute({ board: undefined as any })
    ).rejects.toBeInstanceOf(GameErrors.CannotCreateGameWithoutBoardError);
  });
});
