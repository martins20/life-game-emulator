import { CreateCategoryDTO } from "../dtos/create-category";

export class Category {
  id: string;
  name: string;

  constructor(data: CreateCategoryDTO) {
    Object.assign(this, data);
  }
}
