import { Request, Response } from "express";

export class SimulateGameController {
  async handler(request: Request, response: Response): Promise<Response> {
    return response.json({ ok: true });
  }
}
