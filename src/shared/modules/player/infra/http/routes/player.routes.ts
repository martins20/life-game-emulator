import { Router } from "express";

import { playerCategoryRoutes } from "./category.routes";
import { ListPlayersController } from "../controllers/list-players";
import { CreatePlayerController } from "../controllers/create-player";

const playerRoutes = Router();

const createPlayerController = new CreatePlayerController();
const listPlayersController = new ListPlayersController();

playerRoutes.post("/", createPlayerController.handler);
playerRoutes.get("/", listPlayersController.handler);
playerRoutes.use("/category", playerCategoryRoutes);

export { playerRoutes };
