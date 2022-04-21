import { CreateTypeDTO } from "../dtos/create-type";

export class Type {
  id: string;
  name: string;

  constructor(data: CreateTypeDTO) {
    Object.assign(this, data);
  }
}
