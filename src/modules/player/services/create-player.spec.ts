import { CreatePlayerService as Sut } from "./create-player";
import { FakePlayerRepository } from "../repositories/fakes/player";
import { CreatePlayerDTO } from "../dtos/create-player";

let sut: Sut;
let fakePlayerRepository: FakePlayerRepository;

describe("CreatePlayerService", () => {
  beforeEach(() => {
    fakePlayerRepository = new FakePlayerRepository();

    sut = new Sut(fakePlayerRepository);
  });
  const playerData: CreatePlayerDTO = {
    name: "John Doe",
  };

  it("Should be able to create a new player", async () => {
    const player = await sut.execute(playerData);

    expect(player).toHaveProperty("id");
    expect(player).toMatchObject({
      name: playerData.name,
    });
  });
});
