import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateGameService } from "@modules/game/services/create-game";
import { CreateGameDTO } from "@modules/game/dtos/create-game";

export class CreateGameController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { board_id }: CreateGameDTO = request.body;

    const createGameService = container.resolve(CreateGameService);

    const game = await createGameService.execute({ board_id });

    return response.status(201).json(game);
  }
}
