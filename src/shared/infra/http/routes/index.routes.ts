import { Router } from "express";
import { gameRoutes } from "@modules/game/infra/http/routes/game.routes";
import { boardRoutes } from "@modules/game/infra/http/routes/board.routes";

import { playerRoutes } from "@shared/modules/player/infra/http/routes/player.routes";
import { buildingRoutes } from "@shared/modules/building/infra/http/routes/building.routes";

const apiRoutes = Router();

apiRoutes.use("/game", gameRoutes);
apiRoutes.use("/boards", boardRoutes);
apiRoutes.use("/players", playerRoutes);
apiRoutes.use("/buildings", buildingRoutes);

export { apiRoutes };
