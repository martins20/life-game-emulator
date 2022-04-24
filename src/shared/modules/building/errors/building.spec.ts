import { BuildingErrors } from "./building";

describe("BuildingErrors", () => {
  it("Should to return a error message 'Building already exists' status code equals to 400", () => {
    try {
      throw new BuildingErrors.BuildingAlreadyExistsError();
    } catch (error: any) {
      expect(error.message).toBe("Building already exists");
      expect(error.statusCode).toBe(400);
    }
  });

  it("Should to return a error message ''sale_cost' must be greater than 0' status code equals to 400", () => {
    try {
      throw new BuildingErrors.CannotCreateBuildingWithInvalidSaleCostError();
    } catch (error: any) {
      expect(error.message).toBe("'sale_cost' must be greater than 0");
      expect(error.statusCode).toBe(400);
    }
  });

  it("Should to return a error message ''rent_cost' must be greater than 0' status code equals to 400", () => {
    try {
      throw new BuildingErrors.CannotCreateBuildingWithInvalidRentCostError();
    } catch (error: any) {
      expect(error.message).toBe("'rent_cost' must be greater than 0");
      expect(error.statusCode).toBe(400);
    }
  });

  it("Should to return a error message 'Building not exists' status code equals to 404", () => {
    try {
      throw new BuildingErrors.BuildingNotExistsError();
    } catch (error: any) {
      expect(error.message).toBe("Building not exists");
      expect(error.statusCode).toBe(404);
    }
  });

  it("Should to return a error message 'Building already has owner' status code equals to 400", () => {
    try {
      throw new BuildingErrors.BuildingAlreadyHasOwnerError();
    } catch (error: any) {
      expect(error.message).toBe("Building already has owner");
      expect(error.statusCode).toBe(400);
    }
  });

  it("Should to return a error message 'Buildings [some-property-id-1, some-property-id-2] not exists' status code equals to 404", () => {
    try {
      throw new BuildingErrors.BuildingsNotExistsError([
        "some-property-id-1",
        "some-property-id-2",
      ]);
    } catch (error: any) {
      expect(error.message).toBe(
        "Buildings [some-property-id-1,some-property-id-2] not exists"
      );
      expect(error.statusCode).toBe(404);
    }
  });
});
