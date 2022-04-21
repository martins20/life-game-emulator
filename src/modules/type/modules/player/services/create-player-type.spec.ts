import { CreatePlayerTypeService as Sut } from "./create-player-type";
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
    name: "player-type-test",
    buyPropertyCondictionResponseCallback: jest.fn(),
  };

  it("Should be able to creates a new player type", async () => {
    const playerType = await sut.execute(playerTypeData);

    expect(playerType).toHaveProperty("id");
    expect(playerType).toMatchObject(playerTypeData);
  });

  it("Should not be able to create a new player type if player type name already exists", async () => {
    const playerType = await sut.execute(playerTypeData);

    expect(playerType).toHaveProperty("id");
    expect(playerType).toMatchObject(playerTypeData);
  });
});
