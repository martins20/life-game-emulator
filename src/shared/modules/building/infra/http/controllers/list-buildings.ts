import { container } from "tsyringe";
import { Request, Response } from "express";

import { ListBuildingsService } from "@shared/modules/building/services/list-buildings";

export class ListBuildingsController {
  async handler(_: Request, response: Response): Promise<Response> {
    const listBuildingService = container.resolve(ListBuildingsService);

    const buildings = await listBuildingService.execute();

    return response.json(buildings);
  }
}
