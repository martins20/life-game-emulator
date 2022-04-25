import { Building } from "@shared/modules/building/entities/Building";
import { SetBuildingOwnerDTO } from "@shared/modules/building/dtos/set-building-owner";
import { RemoveBuildingOwnerDTO } from "@shared/modules/building/dtos/remove-building-owner";
import { CreateBuildingDTO } from "@shared/modules/building/dtos/create-building";

import { BuildingRepositoryContract } from "../contract/building-repository";

export class FakeBuildingRepository implements BuildingRepositoryContract {
  private buildings: Building[] = [];

  async create(data: CreateBuildingDTO): Promise<Building> {
    const createdBuilding = new Building(data);

    Object.assign(createdBuilding, {
      id: String(Date.now() * this.buildings.length + 1),
    });

    this.buildings.push(createdBuilding);

    return createdBuilding;
  }

  async findByBuildingName(
    name: Building["name"]
  ): Promise<Building | undefined> {
    const lowerCaseName = name.toLocaleLowerCase();

    const foundBuilding = this.buildings.find(
      (data) => data.name.toLocaleLowerCase() === lowerCaseName
    );

    return foundBuilding;
  }

  async findById(propertyID: Building["id"]): Promise<Building | undefined> {
    const foundBuilding = this.buildings.find((data) => data.id === propertyID);

    return foundBuilding;
  }

  async setBuildingOwner({
    property_id,
    owner,
  }: SetBuildingOwnerDTO): Promise<Building> {
    const updatedBuildingWithOwner = this.buildings.map((data) =>
      data.id === property_id ? { ...data, owner } : data
    );

    this.buildings = updatedBuildingWithOwner;

    const propertyWithOwner = await this.findById(property_id);

    return propertyWithOwner!;
  }

  async removeBuildingByOwner({
    property_id,
  }: RemoveBuildingOwnerDTO): Promise<Building> {
    const updatedBuildingWithoutOwner = this.buildings.map((data) =>
      data.id === property_id ? { ...data, owner: null } : data
    );

    this.buildings = updatedBuildingWithoutOwner;

    const propertyWithoutOwner = await this.findById(property_id);

    return propertyWithoutOwner!;
  }

  async list(): Promise<Building[]> {
    return this.buildings;
  }
}
