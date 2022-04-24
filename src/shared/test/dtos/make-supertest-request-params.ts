import { SuperTest, Test } from "supertest";

export type MakeSuperTestRequestParamsDTO<T = any> = {
  api: SuperTest<Test>;
  path: string;
  payload?: T;
  method: "get" | "post" | "put" | "delete" | "patch";
};
