import { Building } from "@shared/modules/building/entities/Building";
import { SetBuildingOwnerDTO } from "@shared/modules/building/dtos/set-building-owner";
import { RemoveBuildingOwnerDTO } from "@shared/modules/building/dtos/remove-building-owner";
import { CreateBuildingDTO } from "@shared/modules/building/dtos/create-building";

export interface BuildingRepositoryContract {
  create: (data: CreateBuildingDTO) => Promise<Building>;
  findByBuildingName: (name: Building["name"]) => Promise<Building | undefined>;
  findById: (propertyID: Building["id"]) => Promise<Building | undefined>;
  setBuildingOwner: (data: SetBuildingOwnerDTO) => Promise<Building>;
  removeBuildingByOwner: (data: RemoveBuildingOwnerDTO) => Promise<Building>;
}
