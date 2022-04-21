import { Type } from "./Type";
import { CreateTypeDTO } from "../dtos/create-type";

const makeType = (data: CreateTypeDTO): Type => {
  const character = new Type(data);

  return character;
};

describe("Type entity", () => {
  const characterData: CreateTypeDTO = {
    name: "type-test",
  };

  it("Should creates a Type", () => {
    const type = makeType(characterData);

    expect(type).toMatchObject(characterData);
  });
});
