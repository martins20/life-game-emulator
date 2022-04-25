import { ListPlayersService as Sut } from "./list-players";
import { FakePlayerRepository } from "../repositories/fakes/player";

let sut: Sut;
let fakePlayerRepository: FakePlayerRepository;

describe("ListPlayerService", () => {
  beforeEach(() => {
    fakePlayerRepository = new FakePlayerRepository();
    sut = new Sut(fakePlayerRepository);
  });

  it("Should be able to list all players", async () => {
    const players = await sut.execute();

    expect(players).toHaveLength(0);
  });
});
