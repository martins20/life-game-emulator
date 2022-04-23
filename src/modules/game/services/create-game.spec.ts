import { CreateGameService as Sut } from "./create-game";
import { FakeGameRepository } from "../repositories/fakes/game";
import { FakeBoardRepository } from "../repositories/fakes/board";
import { BoardErrors } from "../errors/board";
import { Board } from "../entities/Board";

let sut: Sut;
let board: Board;
let fakeGameRepository: FakeGameRepository;
let fakeBoardRepository: FakeBoardRepository;

describe("CreateGameService", () => {
  beforeEach(async () => {
    fakeGameRepository = new FakeGameRepository();
    fakeBoardRepository = new FakeBoardRepository();
    sut = new Sut(fakeGameRepository, fakeBoardRepository);

    board = await fakeBoardRepository.create({
      buildings: [],
      players: [],
    });
  });

  it("Should not be able to create a game a non existent board", async () => {
    await expect(
      sut.execute({ board_id: "non-existent-board" })
    ).rejects.toBeInstanceOf(BoardErrors.BoardNotExistsError);
  });

  it("Should be able to create a game", async () => {
    const game = await sut.execute({ board_id: board.id });

    expect(game).toHaveProperty("id");
    expect(game).toMatchObject({ board });
  });
});
