import { container } from "tsyringe";
import { Response, Request } from "express";

import { CreatePlayerService } from "@shared/modules/player/services/create-player";
import { CreatePlayerDTO } from "@shared/modules/player/dtos/create-player";

export class CreatePlayerController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { name }: CreatePlayerDTO = request.body;

    const createPlayerService = container.resolve(CreatePlayerService);

    const createdPlayer = await createPlayerService.execute({ name });

    return response.status(201).json(createdPlayer);
  }
}
