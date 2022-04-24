import { Router } from "express";

import { CreateBuildingController } from "../controllers/create-building";

const buildingRoutes = Router();

const createBuildingController = new CreateBuildingController();

buildingRoutes.post("/", createBuildingController.handler);

export { buildingRoutes };
