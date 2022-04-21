import { MovePlayerForwardService as Sut } from "./move-player-forward";
import { FakePlayerRepository } from "../repositories/fakes/player";
import { PlayerErrors } from "../errors/player";

let sut: Sut;
let fakePlayerRepository: FakePlayerRepository;

describe("MovePlayerForwardService", () => {
  beforeEach(() => {
    fakePlayerRepository = new FakePlayerRepository();
    sut = new Sut(fakePlayerRepository);
  });

  it("Should not be able to move a non existent player", async () => {
    await expect(
      sut.execute({ player_id: "non-existent-player-id", steps: 1 })
    ).rejects.toBeInstanceOf(PlayerErrors.PlayerNotExistsError);
  });
});
