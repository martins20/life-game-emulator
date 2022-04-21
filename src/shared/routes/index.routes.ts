import { Router } from "express";

const appRoutes = Router();

appRoutes.use("game", gameRoutes);

export { appRoutes };
