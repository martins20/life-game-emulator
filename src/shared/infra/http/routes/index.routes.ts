import { Router } from "express";
import { gameRoutes } from "@modules/game/routes/index.routes";

import { playerRoutes } from "@shared/modules/player/infra/http/routes/player.routes";

const apiRoutes = Router();

apiRoutes.use("/game", gameRoutes);
apiRoutes.use("/players", playerRoutes);

export { apiRoutes };
