import { Router } from "express";
import { gameRoutes } from "@modules/game/routes/index.routes";

const appRoutes = Router();

appRoutes.use("/game", gameRoutes);

export { appRoutes };
