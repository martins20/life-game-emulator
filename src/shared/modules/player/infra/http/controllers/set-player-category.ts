import { container } from "tsyringe";
import { Request, Response } from "express";

import { SetPlayerCategoryService } from "../../../services/set-player-category";
import { SetPlayerCategoryDTO } from "../../../dtos/set-player-category";

export class SetPlayerCategoryController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { player_id, category_name }: SetPlayerCategoryDTO = request.body;

    const setPlayerCategoryService = container.resolve(
      SetPlayerCategoryService
    );

    const playerWithCategoty = await setPlayerCategoryService.execute({
      player_id,
      category_name,
    });

    return response.json(playerWithCategoty);
  }
}
