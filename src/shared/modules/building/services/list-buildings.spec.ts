import { ListBuildingsService as Sut } from "./list-buildings";
import { FakeBuildingRepository } from "../repositories/fakes/building";

let sut: Sut;
let fakeBuildingRepository: FakeBuildingRepository;

describe("ListBuildingService", () => {
  beforeEach(() => {
    fakeBuildingRepository = new FakeBuildingRepository();
    sut = new Sut(fakeBuildingRepository);
  });

  it("Should be able to list all buildings", async () => {
    const buildings = await sut.execute();

    expect(buildings).toHaveLength(0);
  });
});
