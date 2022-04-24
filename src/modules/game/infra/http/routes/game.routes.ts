import { Router } from "express";

import { CreateGameController } from "../controllers/create-game";

const gameRoutes = Router();

const createGameController = new CreateGameController();

gameRoutes.post("/", createGameController.handler);

export { gameRoutes };
