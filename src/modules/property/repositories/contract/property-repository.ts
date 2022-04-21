import { Property } from "@modules/property/entities/Property";
import { CreatePropertyDTO } from "@modules/property/dtos/create-property";

export interface PropertyRepositoryContract {
  create: (data: CreatePropertyDTO) => Promise<Property>;
}
