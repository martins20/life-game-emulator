import { inject, injectable } from "tsyringe";

import { PlayerRepositoryContract } from "@shared/modules/player/repositories/contract/player-repository";
import { Player } from "@shared/modules/player/entities/Player";
import { BuildingRepositoryContract } from "@shared/modules/building/repositories/contract/building-repository";
import { Building } from "@shared/modules/building/entities/Building";
import { MAX_GAME_BUILDINGS } from "@shared/modules/building/constants/max-game-buildings";
import { rollTheDiceHelper } from "@shared/helpers/roll-the-dice";

import { GameRepositoryContract } from "../repositories/contract/game-repository";
import { BoardRepositoryContract } from "../repositories/contract/board-repository";
import { GameErrors } from "../errors/game";
import { Game } from "../entities/Game";
import { SimulateGameResponseDTO } from "../dtos/simulate-game-response";
import { SimulateGameDTO } from "../dtos/simulate-game";

@injectable()
export class SimulateGameService {
  constructor(
    @inject("GamesRepository")
    private gamesRepository: GameRepositoryContract,
    @inject("BoardsRepository")
    private boardsRepository: BoardRepositoryContract,
    @inject("PlayersRepository")
    private playersRepository: PlayerRepositoryContract,
    @inject("BuildingsRepository")
    private buildinsRepository: BuildingRepositoryContract
  ) {}

  private async gameChecks({ game_id }: SimulateGameDTO): Promise<Game> {
    const foundGameById = await this.gamesRepository.findById(game_id);

    if (!foundGameById) throw new GameErrors.GameNotExistsError();

    const { is_game_finished } = foundGameById;

    if (is_game_finished)
      throw new GameErrors.CannotSimulateFinishedGameError();

    return foundGameById;
  }

  private suffePlayersToResponse(players: Player[]): string[] {
    const mappedPlayersByDescBalance = players
      .sort((player1, player2) => player2.balance - player1.balance)
      .map((data) => String(data.name));

    return mappedPlayersByDescBalance;
  }

  private finishGame(players: Player[]): SimulateGameResponseDTO {
    const playerWinner = players.reduce<Player>(
      (accumulator, currentTarget) => {
        if (currentTarget.balance > accumulator.balance) return currentTarget;

        return accumulator;
      },
      players[0]
    );

    const response: SimulateGameResponseDTO = {
      winner: playerWinner.name,
      players: this.suffePlayersToResponse(players),
    };

    return response;
  }

  private async buyBuilding(playerData: Player, buildingData: Building) {
    const player = await this.playersRepository.decreasePlayerBalance({
      player_id: playerData.id,
      value: buildingData.sale_cost,
    });

    const building = await this.buildinsRepository.setBuildingOwner({
      owner: player,
      property_id: buildingData.id,
    });

    return { player, building };
  }

  private async increasePlayerBalanceIfHimMakeACompleteBoardTurn({
    player_turn_dice_result,
    player,
  }: {
    player_turn_dice_result: number;
    player: Player;
  }) {
    const movedPlayerForward = await this.playersRepository.moveForward({
      player_id: player.id,
      steps: player_turn_dice_result,
    });

    const playerTurnAllCompleteBoardQuantity =
      movedPlayerForward.round - player.round;

    const isPlayerBackIntoInitialPosition =
      playerTurnAllCompleteBoardQuantity > 0;

    if (!isPlayerBackIntoInitialPosition) return movedPlayerForward;

    const playerWithUpdatedBalance =
      await this.playersRepository.increasePlayerBalance({
        player_id: movedPlayerForward.id,
        value: 100 * playerTurnAllCompleteBoardQuantity,
      });

    return playerWithUpdatedBalance;
  }

  private async startGame({
    latestGameData,
  }: {
    latestGameData: Game;
  }): Promise<SimulateGameResponseDTO> {
    const { round, max_rounds } = latestGameData;
    const { players, buildings } = latestGameData.board;
    const shouldGameFinishWithMaxRoundRached = round === max_rounds;

    const isEveryPlayerWithPositiveBalance = players.every(
      (data) => data.balance > 0
    );

    const isGameEnded =
      !isEveryPlayerWithPositiveBalance || shouldGameFinishWithMaxRoundRached;

    if (isGameEnded) return this.finishGame(players);

    const updatedBuildings: Building[] = buildings;
    const updatedPlayers: Player[] = players;

    const update = await Promise.all(
      players.map(async (_, index) => {
        const quantityOfBuildingsToMoveForward = rollTheDiceHelper();

        const updatedPlayerBalace =
          await this.increasePlayerBalanceIfHimMakeACompleteBoardTurn({
            player: updatedPlayers[index],
            player_turn_dice_result: quantityOfBuildingsToMoveForward,
          });

        updatedPlayers[index] = updatedPlayerBalace;

        const positionOfPlayerIntoBoard =
          (updatedPlayers[index].position % MAX_GAME_BUILDINGS) + 1;

        const buildingPosition = positionOfPlayerIntoBoard - 1;

        const buildingOfPlayerPosition = updatedBuildings[buildingPosition];

        const hasBuildingOwner = !!buildingOfPlayerPosition.owner;

        if (hasBuildingOwner) {
          if (
            buildingOfPlayerPosition.owner!.name === updatedPlayers[index].name
          )
            return updatedPlayers[index];

          const updatedPlayerWitDecreasesBalance =
            await this.playersRepository.decreasePlayerBalance({
              player_id: updatedPlayers[index].id,
              value: buildingOfPlayerPosition.rent_cost,
            });

          updatedPlayers[index] = updatedPlayerWitDecreasesBalance;

          const foundBuildingOwnerIndex = updatedPlayers.findIndex(
            (data) => data.id === buildingOfPlayerPosition.owner!.id
          );

          const buildOwner = updatedPlayers[foundBuildingOwnerIndex];

          const updatedPlayerWithIncreasedBalance =
            await this.playersRepository.increasePlayerBalance({
              player_id: buildOwner.id,
              value: buildingOfPlayerPosition.rent_cost,
            });

          updatedPlayers[foundBuildingOwnerIndex] =
            updatedPlayerWithIncreasedBalance;

          return updatedPlayers[index];
        }

        const shouldPlayerBuyTheBuilding = updatedPlayers[
          index
        ].category!.buyBuildingCondictionResponseCallback({
          player_balance: updatedPlayers[index].balance,
          rent_value: buildingOfPlayerPosition.rent_cost,
          sale_cost: buildingOfPlayerPosition.sale_cost,
        });

        if (!shouldPlayerBuyTheBuilding) return updatedPlayers[index];

        const { player, building } = await this.buyBuilding(
          updatedPlayers[index],
          buildingOfPlayerPosition
        );

        updatedPlayers[index] = player;
        updatedBuildings[buildingPosition] = building;

        return updatedPlayers[index];
      })
    );

    const updateGame: Game = {
      ...latestGameData,
      round: latestGameData.round + 1,
      board: {
        ...latestGameData.board,
        buildings: updatedBuildings,
        players: update,
      },
    };

    return this.startGame({
      latestGameData: updateGame,
    });
  }

  async execute(data: SimulateGameDTO): Promise<SimulateGameResponseDTO> {
    const game = await this.gameChecks(data);

    const finishedGame = await this.gamesRepository.finishGame(game.id);

    const response = await this.startGame({
      latestGameData: finishedGame,
    });

    return response;
  }
}
