import { PropertyErrors } from "./property";

describe("PropertyErrors", () => {
  it("Should to return a error message 'Property already exists' status code equals to 400", () => {
    try {
      throw new PropertyErrors.PropertyAlreadyExistsError();
    } catch (error: any) {
      expect(error.message).toBe("Property already exists");
      expect(error.statusCode).toBe(400);
    }
  });
});
