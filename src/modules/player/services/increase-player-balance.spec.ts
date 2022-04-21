import { IncreasePlayerBalanceService as Sut } from "./increase-player-balance";
import { FakePlayerRepository } from "../repositories/fakes/player";
import { PlayerErrors } from "../errors/player";
import { Player } from "../entities/Player";
import { CreatePlayerDTO } from "../dtos/create-player";

let sut: Sut;
let player: Player;
let fakePlayerRepository: FakePlayerRepository;

let sutSpy: SutSpy;

const playerData: CreatePlayerDTO = {
  name: "John Doe",
};

class SutSpy {
  async createPlayer(data: CreatePlayerDTO): Promise<Player> {
    const player = await fakePlayerRepository.create(data);

    return player;
  }
}

describe("IncreasePlayerBalanceService", () => {
  beforeEach(async () => {
    fakePlayerRepository = new FakePlayerRepository();
    sut = new Sut(fakePlayerRepository);

    sutSpy = new SutSpy();

    player = await sutSpy.createPlayer(playerData);
  });
  const increaseBalaceQuantity = 10;

  it("Should not be able to increase player's balance if the player not exists", async () => {
    expect(
      sut.execute({
        player_id: "non-existent-player",
        value: increaseBalaceQuantity,
      })
    ).rejects.toBeInstanceOf(PlayerErrors.PlayerNotExistsError);
  });

  it("Should be able to increase player's balance", async () => {
    const result = await sut.execute({
      player_id: player.id,
      value: increaseBalaceQuantity,
    });

    expect(result).toMatchObject({
      name: playerData.name,
      balance: player.balance + increaseBalaceQuantity,
    });
  });
});
