import { CreateGameService as Sut } from "./create-game";
import { FakeGameRepository } from "../repositories/fakes/game";
import { FakeBoardRepository } from "../repositories/fakes/board";
import { BoardErrors } from "../errors/board";

let sut: Sut;
let fakeGameRepository: FakeGameRepository;
let fakeBoardRepository: FakeBoardRepository;

describe("CreateGameService", () => {
  beforeEach(() => {
    fakeGameRepository = new FakeGameRepository();
    fakeBoardRepository = new FakeBoardRepository();
    sut = new Sut(fakeGameRepository, fakeBoardRepository);
  });

  it("Should not be able to create a game a non existent board", async () => {
    await expect(
      sut.execute({ board_id: "non-existent-board" })
    ).rejects.toBeInstanceOf(BoardErrors.BoardNotExistsError);
  });
});
