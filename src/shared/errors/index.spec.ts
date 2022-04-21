import { ApiErrors } from ".";

describe("Custom Api Errors", () => {
  it("Should be able to return a error with status code 500 telling it was an error from server", () => {
    try {
      throw new ApiErrors.InternalServerError(
        "It was an error from the server."
      );
    } catch (error: any) {
      expect(error.message).toBe("It was an error from the server.");
      expect(error.statusCode).toBe(500);
    }
  });
});
