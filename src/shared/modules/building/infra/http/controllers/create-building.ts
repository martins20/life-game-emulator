import { container } from "tsyringe";
import { Response, Request } from "express";

import { CreateBuildingService } from "@shared/modules/building/service/create-building";
import { CreateBuildingDTO } from "@shared/modules/building/dtos/create-building";

export class CreateBuildingController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { name, rent_cost, sale_cost }: CreateBuildingDTO = request.body;

    const createBuildingService = container.resolve(CreateBuildingService);

    const createdBuilding = await createBuildingService.execute({
      name,
      rent_cost,
      sale_cost,
    });

    return response.status(201).json(createdBuilding);
  }
}
