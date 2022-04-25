import { Building } from "../entities/Building";
import { CreateBuildingDTO } from "../dtos/create-building";

function getRandomNumber(): number {
  const randomNumber = Math.round(Math.random() * (Math.random() * 20) * 10);

  return randomNumber;
}

export function generateBuildingDataWithRandomRentAndSaleCostValuesHelper(
  buildingName: Building["name"]
): CreateBuildingDTO {
  const buildingData: CreateBuildingDTO = {
    name: buildingName,
    rent_cost: getRandomNumber() + 1,
    sale_cost: getRandomNumber() + 1,
  };

  return buildingData;
}
