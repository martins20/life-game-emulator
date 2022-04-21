import { Property } from "@shared/modules/property/entities/Property";
import { SetPropertyOwnerDTO } from "@shared/modules/property/dtos/set-property-owner";
import { RemovePropertyOwnerDTO } from "@shared/modules/property/dtos/remove-property-owner";
import { CreatePropertyDTO } from "@shared/modules/property/dtos/create-property";

export interface PropertyRepositoryContract {
  create: (data: CreatePropertyDTO) => Promise<Property>;
  findByPropertyName: (name: Property["name"]) => Promise<Property | undefined>;
  findById: (propertyID: Property["id"]) => Promise<Property | undefined>;
  setPropertyOwner: (data: SetPropertyOwnerDTO) => Promise<Property>;
  removePropertyByOwner: (data: RemovePropertyOwnerDTO) => Promise<Property>;
}
