import { CreatePlayerTypeService as Sut } from "./create-characteristic";
import { FakePlayerTypeRepository } from "../repositories/fakes/player-type";
import { CreatePlayerTypeDTO } from "../dtos/create-player-type";

let sut: Sut;
let fakePlayerTypeRepository: FakePlayerTypeRepository;

describe("CreatePlayerTypeService", () => {
  beforeEach(() => {
    fakePlayerTypeRepository = new FakePlayerTypeRepository();
    sut = new Sut(fakePlayerTypeRepository);
  });

  const playerTypeData: CreatePlayerTypeDTO = {
    name: "payer-type-test",
    buyPropertyCondictionResponseCallback: jest.fn(),
  };

  it("Should be able to creates a new player type", async () => {
    const playerType = await sut.execute(playerTypeData);

    expect(playerType).toHaveProperty("id");
    expect(playerType).toMatchObject(playerTypeData);
  });
});
