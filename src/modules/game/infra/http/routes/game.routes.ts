import { Router } from "express";

import { simulateGameRoutes } from "./simulate.routes";
import { CreateGameController } from "../controllers/create-game";

const gameRoutes = Router();

const createGameController = new CreateGameController();

gameRoutes.post("/", createGameController.handler);
gameRoutes.use("/simulate", simulateGameRoutes);

export { gameRoutes };
