import { Building } from "@shared/modules/building/entities/Building";
import { SetBuildingOwnerDTO } from "@shared/modules/building/dtos/set-building-owner";
import { RemoveBuildingOwnerDTO } from "@shared/modules/building/dtos/remove-building-owner";
import { CreateBuildingDTO } from "@shared/modules/building/dtos/create-building";

import { BuildingRepositoryContract } from "../contract/building-repository";
import { GenerateBuildingDataWithRandomRentAndSaleCostValuesHelper } from "../../helpers/generate-building-data-with-random-rent-and-sale-cost-values";
import { MAX_GAME_BUILDINGS } from "../../constants/max-game-buildings";

export class InMemoryBuildingRepository implements BuildingRepositoryContract {
  constructor() {}

  private properties: Building[] = [];

  async runSeeds() {
    await Promise.all(
      Array.from({ length: MAX_GAME_BUILDINGS }).map((_, index) =>
        this.create(
          GenerateBuildingDataWithRandomRentAndSaleCostValuesHelper(
            `Building ${index + 1}`
          )
        )
      )
    );
  }

  async create(data: CreateBuildingDTO): Promise<Building> {
    const createdBuilding = new Building(data);

    Object.assign(createdBuilding, {
      id: String(Date.now() * this.properties.length + 1),
    });

    this.properties.push(createdBuilding);

    return createdBuilding;
  }

  async findByBuildingName(
    name: Building["name"]
  ): Promise<Building | undefined> {
    const lowerCaseName = name.toLocaleLowerCase();

    const foundBuilding = this.properties.find(
      (data) => data.name.toLocaleLowerCase() === lowerCaseName
    );

    return foundBuilding;
  }

  async findById(propertyID: Building["id"]): Promise<Building | undefined> {
    const foundBuilding = this.properties.find(
      (data) => data.id === propertyID
    );

    return foundBuilding;
  }

  async setBuildingOwner({
    property_id,
    owner,
  }: SetBuildingOwnerDTO): Promise<Building> {
    const updatedBuildingWithOwner = this.properties.map((data) =>
      data.id === property_id ? { ...data, owner } : data
    );

    this.properties = updatedBuildingWithOwner;

    const propertyWithOwner = await this.findById(property_id);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return propertyWithOwner!;
  }

  async removeBuildingByOwner({
    property_id,
  }: RemoveBuildingOwnerDTO): Promise<Building> {
    const updatedBuildingWithoutOwner = this.properties.map((data) =>
      data.id === property_id ? { ...data, owner: null } : data
    );

    this.properties = updatedBuildingWithoutOwner;

    const propertyWithoutOwner = await this.findById(property_id);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return propertyWithoutOwner!;
  }
}
