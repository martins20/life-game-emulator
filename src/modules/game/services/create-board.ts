import { inject, injectable } from "tsyringe";

import { PropertyRepositoryContract } from "@shared/modules/property/repositories/contract/property-repository";
import { PropertyErrors } from "@shared/modules/property/errors/property";
import { Property } from "@shared/modules/property/entities/Property";
import { PlayerRepositoryContract } from "@shared/modules/player/repositories/contract/player-repository";
import { PlayerErrors } from "@shared/modules/player/errors/player";
import { Player } from "@shared/modules/player/entities/Player";

import { BoardRepositoryContract } from "../repositories/contract/board-repository";
import { BoardErrors } from "../errors/board";
import { Board } from "../entities/Board";
import { CreateBoardDTO } from "../dtos/create-board";

type ReduceredPlayersFromNotFoundPlayersResponse = {
  player_id: string;
  was_found: boolean;
};
@injectable()
export class CreateBoardService {
  constructor(
    @inject("BoardsRepository")
    private boardsRepository: BoardRepositoryContract,
    @inject("PlayersRepository")
    private playersRepository: PlayerRepositoryContract,
    @inject("PropertiesRepository")
    private propertiesRepository: PropertyRepositoryContract
  ) {}

  private checkHasNotFoundPlayers(
    foundPlayers: (Player | undefined)[],
    servicePlayerIDs: string[]
  ): void {
    const reduceredPlayersFromNotFoundPlayers = foundPlayers.reduce<
      ReduceredPlayersFromNotFoundPlayersResponse[]
    >((accumulator, currentTarget, index) => {
      const isPlayerFound = !!currentTarget?.id;

      accumulator.push({
        player_id: servicePlayerIDs[index],
        was_found: isPlayerFound,
      });

      return accumulator;
    }, []);

    const everyPlayerWasFound = reduceredPlayersFromNotFoundPlayers.every(
      (player) => player.was_found
    );

    if (!everyPlayerWasFound) {
      const notFoundPlayerIDS = reduceredPlayersFromNotFoundPlayers
        .filter((data) => !data.was_found)
        .map((data) => data.player_id);

      throw new PlayerErrors.PlayersNotExistsError(notFoundPlayerIDS);
    }
  }

  private checkHasNotFoundBuildings(
    foundPlayers: (Property | undefined)[],
    servicePlayerIDs: string[]
  ): void {
    const reduceredPlayersFromNotFoundPlayers = foundPlayers.reduce<
      ReduceredPlayersFromNotFoundPlayersResponse[]
    >((accumulator, currentTarget, index) => {
      const isPlayerFound = !!currentTarget?.id;

      accumulator.push({
        player_id: servicePlayerIDs[index],
        was_found: isPlayerFound,
      });

      return accumulator;
    }, []);

    const everyPlayerWasFound = reduceredPlayersFromNotFoundPlayers.every(
      (player) => player.was_found
    );

    if (!everyPlayerWasFound) {
      const notPropertiesPlayerIDS = reduceredPlayersFromNotFoundPlayers
        .filter((data) => !data.was_found)
        .map((data) => data.player_id);

      throw new PropertyErrors.PropertiesNotExistsError(notPropertiesPlayerIDS);
    }
  }

  async execute(data: CreateBoardDTO): Promise<Board> {
    const hasBoardPlayers = data.player_ids.length;
    const hasBoardBuildings = data.building_ids.length;

    if (!hasBoardPlayers)
      throw new BoardErrors.CannotCreateBoardWithoutPlayersError();

    if (!hasBoardBuildings)
      throw new BoardErrors.CannotCreateBoardWithoutBuildingsError();

    const playerPromises = data.player_ids.map((player_id) =>
      this.playersRepository.findById(player_id)
    );

    const buildingPromises = data.building_ids.map((bulding_id) =>
      this.propertiesRepository.findById(bulding_id)
    );

    const foundPlayers = await Promise.all(playerPromises);

    const foundBuildings = await Promise.all(buildingPromises);

    this.checkHasNotFoundPlayers(foundPlayers, data.player_ids);
    this.checkHasNotFoundBuildings(foundBuildings, data.player_ids);

    const board = this.boardsRepository.create({
      players: foundPlayers as Player[],
      buildings: foundBuildings as Property[],
    });

    return board;
  }
}
