import { api } from "./Server";

const apiPort = Number(process.env.API_PORT);

api.listen(apiPort, () =>
  console.log(`🛰  Server listening on port ${apiPort} 🛰`)
);
