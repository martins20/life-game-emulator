import { container } from "tsyringe";
import { Request, Response } from "express";
import { SimulateGameService } from "@modules/game/services/simulate-game";
import { SimulateGameDTO } from "@modules/game/dtos/simulate-game";

export class SimulateGameController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { game_id }: SimulateGameDTO = request.body;

    const simulateGameService = container.resolve(SimulateGameService);

    const gameResponse = await simulateGameService.execute({
      game_id,
    });

    return response.json(gameResponse);
  }
}
