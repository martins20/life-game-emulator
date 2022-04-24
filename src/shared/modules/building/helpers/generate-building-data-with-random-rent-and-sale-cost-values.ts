import { Building } from "../entities/Building";
import { CreateBuildingDTO } from "../dtos/create-building";

function getRandomNumber(): number {
  const randomNumber = Math.round(Math.random() * (Math.random() * 20) * 10);

  return randomNumber;
}

export function GenerateBuildingDataWithRandomRentAndSaleCostValuesHelper(
  buildingName: Building["name"]
): CreateBuildingDTO {
  const buildingData: CreateBuildingDTO = {
    name: buildingName,
    rent_cost: getRandomNumber(),
    sale_cost: getRandomNumber(),
  };

  return buildingData;
}
