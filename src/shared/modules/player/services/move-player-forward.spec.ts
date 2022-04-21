import { MovePlayerForwardService as Sut } from "./move-player-forward";
import { FakePlayerRepository } from "../repositories/fakes/player";
import { PlayerErrors } from "../errors/player";
import { Player } from "../entities/Player";
import { CreatePlayerDTO } from "../dtos/create-player";

let sut: Sut;
let player: Player;
let sutSpy: SutSpy;
let fakePlayerRepository: FakePlayerRepository;

const playerData: CreatePlayerDTO = {
  name: "John Doe",
};

class SutSpy {
  async createPlayer(data: CreatePlayerDTO): Promise<Player> {
    const player = await fakePlayerRepository.create(data);

    return player;
  }
}

describe("MovePlayerForwardService", () => {
  beforeEach(async () => {
    fakePlayerRepository = new FakePlayerRepository();
    sut = new Sut(fakePlayerRepository);

    sutSpy = new SutSpy();

    player = await sutSpy.createPlayer(playerData);
  });

  it("Should not be able to move a non existent player", async () => {
    await expect(
      sut.execute({ player_id: "non-existent-player-id", steps: 1 })
    ).rejects.toBeInstanceOf(PlayerErrors.PlayerNotExistsError);
  });

  it("Should be able to move a player forward", async () => {
    const steps = 1;

    const movedPlayer = await sut.execute({ player_id: player.id, steps });

    expect(movedPlayer).toMatchObject({
      ...player,
      position: player.position + steps,
    });
  });

  it("Should not be able to move player with steps less than 0", async () => {
    await expect(
      sut.execute({ player_id: player.id, steps: -1 })
    ).rejects.toBeInstanceOf(PlayerErrors.StepsMustBeGreaterOrEqualToZeroError);
  });
});
