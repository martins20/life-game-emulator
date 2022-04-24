import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateBoardService } from "@modules/game/services/create-board";
import { CreateBoardDTO } from "@modules/game/dtos/create-board";

export class CreateBoardController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { building_ids, player_ids }: CreateBoardDTO = request.body;

    const createBoardService = container.resolve(CreateBoardService);

    const createdBoard = await createBoardService.execute({
      building_ids,
      player_ids,
    });

    return response.status(201).json(createdBoard);
  }
}
