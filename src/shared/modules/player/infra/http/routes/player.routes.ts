import { Router } from "express";

import { playerCategoryRoutes } from "./category.routes";
import { CreatePlayerController } from "../controllers/create-player";

const playerRoutes = Router();

const createPlayerController = new CreatePlayerController();

playerRoutes.post("/", createPlayerController.handler);
playerRoutes.use("/category", playerCategoryRoutes);

export { playerRoutes };
