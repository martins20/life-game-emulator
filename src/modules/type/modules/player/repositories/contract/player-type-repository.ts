import { PlayerType } from "../../entities/PlayerType";
import { CreatePlayerTypeDTO } from "../../dtos/create-player-type";

export interface PlayerTypeRepositoryContract {
  create: (data: CreatePlayerTypeDTO) => Promise<PlayerType>;
  findByPlayerTypeName: (
    name: PlayerType["name"]
  ) => Promise<PlayerType | undefined>;
}
