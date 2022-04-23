import { inject, injectable } from "tsyringe";

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
    private playersRepository: PlayerRepositoryContract
  ) {}

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

    const foundPlayers = await Promise.all(playerPromises);

    const reduceredPlayersFromNotFoundPlayers = foundPlayers.reduce<
      ReduceredPlayersFromNotFoundPlayersResponse[]
    >((accumulator, currentTarget, index) => {
      const isPlayerFound = !!currentTarget?.id;

      accumulator.push({
        player_id: data.player_ids[index],
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

    const board = this.boardsRepository.create({
      players: foundPlayers as Player[],
      buildings: [],
    });

    return board;
  }
}
