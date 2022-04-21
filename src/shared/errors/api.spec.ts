import { ApiError } from "./api";

describe("ApiError", () => {
  it("Should to return a error message with default status code 400", () => {
    try {
      throw new ApiError("message");
    } catch (error: any) {
      expect(error.message).toBe("message");
      expect(error.statusCode).toBe(400);
    }
  });

  it("Should to return a error message with a custom status", () => {
    try {
      throw new ApiError("message", 401);
    } catch (error: any) {
      expect(error.message).toBe("message");
      expect(error.statusCode).toBe(401);
    }
  });
});
