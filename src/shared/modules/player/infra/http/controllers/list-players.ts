import { container } from "tsyringe";
import { Request, Response } from "express";

import { ListPlayersService } from "@shared/modules/player/services/list-players";

export class ListPlayersController {
  async handler(_: Request, response: Response): Promise<Response> {
    const listPlayerService = container.resolve(ListPlayersService);

    const players = await listPlayerService.execute();

    return response.json(players);
  }
}
