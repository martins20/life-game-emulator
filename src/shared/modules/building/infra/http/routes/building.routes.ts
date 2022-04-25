import { Router } from "express";

import { ListBuildingsController } from "../controllers/list-buildings";
import { CreateBuildingController } from "../controllers/create-building";

const buildingRoutes = Router();

const createBuildingController = new CreateBuildingController();
const listBuildingsController = new ListBuildingsController();

buildingRoutes.post("/", createBuildingController.handler);
buildingRoutes.get("/", listBuildingsController.handler);

export { buildingRoutes };
