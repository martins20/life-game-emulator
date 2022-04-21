import { Category } from "./Category";
import { CreateCategoryDTO } from "../dtos/create-category";

const makeCategory = (data: CreateCategoryDTO): Category => {
  const character = new Category(data);

  return character;
};

describe("Category entity", () => {
  const CategoryData: CreateCategoryDTO = {
    name: "category-test",
  };

  it("Should creates a Category", () => {
    const category = makeCategory(CategoryData);

    expect(category).toMatchObject(CategoryData);
  });
});
