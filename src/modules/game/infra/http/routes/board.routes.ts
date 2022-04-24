import { Router } from "express";

import { CreateBoardController } from "../controllers/create-board";

const boardRoutes = Router();

const createBoardController = new CreateBoardController();

boardRoutes.post("/", createBoardController.handler);

export { boardRoutes };
