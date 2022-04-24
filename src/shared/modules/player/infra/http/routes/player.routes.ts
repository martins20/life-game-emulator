import { Router } from "express";

import { CreatePlayerController } from "../controllers/create-player";

const playerRoutes = Router();

const createPlayerController = new CreatePlayerController();

playerRoutes.post("/", createPlayerController.handler);

export { playerRoutes };
