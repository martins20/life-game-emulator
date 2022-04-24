import { Router } from "express";

import { SimulateGameController } from "../controllers/simulate-game";

const simulateGameRoutes = Router();

const simulateGameController = new SimulateGameController();

simulateGameRoutes.post("/", simulateGameController.handler);

export { simulateGameRoutes };
