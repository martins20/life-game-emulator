import { Router } from "express";

import { SetPlayerCategoryController } from "../controllers/set-player-category";

const playerCategoryRoutes = Router();

const setPlayerCategoryController = new SetPlayerCategoryController();

playerCategoryRoutes.put("/", setPlayerCategoryController.handler);

export { playerCategoryRoutes };
