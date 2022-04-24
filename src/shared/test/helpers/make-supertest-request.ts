import { Response } from "supertest";

import { MakeSuperTestRequestParamsDTO } from "../dtos/make-supertest-request-params";

export const makeSuperTestRequest = async <T = undefined>({
  api,
  path,
  method,
  payload,
}: MakeSuperTestRequestParamsDTO<T>): Promise<Response> => {
  const createdRequest = api[method](path);

  if (payload) createdRequest.send(payload as any);

  const response = await createdRequest;

  return response;
};
