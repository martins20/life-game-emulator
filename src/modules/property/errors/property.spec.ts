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

  it("Should to return a error message ''sale_cost' must be greater than 0' status code equals to 400", () => {
    try {
      throw new PropertyErrors.CannotCreatePropertyWithInvalidSaleCostError();
    } catch (error: any) {
      expect(error.message).toBe("'sale_cost' must be greater than 0");
      expect(error.statusCode).toBe(400);
    }
  });

  it("Should to return a error message ''rent_cost' must be greater than 0' status code equals to 400", () => {
    try {
      throw new PropertyErrors.CannotCreatePropertyWithInvalidRentCostError();
    } catch (error: any) {
      expect(error.message).toBe("'rent_cost' must be greater than 0");
      expect(error.statusCode).toBe(400);
    }
  });
});
