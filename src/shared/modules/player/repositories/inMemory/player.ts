import { Player } from "@shared/modules/player/entities/Player";
import { IncreasePlayerBalanceDTO } from "@shared/modules/player/dtos/increase-player-balance";
import { DecreasePlayerBalanceDTO } from "@shared/modules/player/dtos/decrease-player-balance";
import { CreatePlayerDTO } from "@shared/modules/player/dtos/create-player";
import { MAX_GAME_BUILDINGS } from "@shared/modules/building/constants/max-game-buildings";

import { PlayerRepositoryContract } from "../contract/player-repository";
import { UpdatePlayerCategoryDTO } from "../../dtos/update-player-category";
import { MovePlayerForwardDTO } from "../../dtos/move-player-forward";

export class InMemoryPlayerRepository implements PlayerRepositoryContract {
  private players: Player[] = [];

  async create(data: CreatePlayerDTO): Promise<Player> {
    const createdPlayer = new Player(data.name);

    Object.assign(createdPlayer, {
      id: String(Date.now() * this.players.length + 1),
    });

    this.players.push(createdPlayer);

    return createdPlayer;
  }

  async findByPlayerName(name: Player["name"]): Promise<Player | undefined> {
    const lowerCaseName = name.toLocaleLowerCase();

    const foundPlayer = this.players.find(
      (data) => data.name.toLocaleLowerCase() === lowerCaseName
    );

    return foundPlayer;
  }

  async findById(playerID: Player["id"]): Promise<Player | undefined> {
    const foundPlayer = this.players.find((data) => data.id === playerID);

    return foundPlayer;
  }

  async increasePlayerBalance({
    player_id,
    value,
  }: IncreasePlayerBalanceDTO): Promise<Player> {
    const updatedPlayers = this.players.map((data) =>
      data.id === player_id ? { ...data, balance: data.balance + value } : data
    );

    this.players = updatedPlayers;

    const updatedPlayer = await this.findById(player_id);

    return updatedPlayer!;
  }

  async decreasePlayerBalance({
    player_id,
    value,
  }: DecreasePlayerBalanceDTO): Promise<Player> {
    const updatedPlayers = this.players.map((data) =>
      data.id === player_id ? { ...data, balance: data.balance - value } : data
    );

    this.players = updatedPlayers;

    const updatedPlayer = await this.findById(player_id);

    return updatedPlayer!;
  }

  async moveForward({
    player_id,
    steps,
  }: MovePlayerForwardDTO): Promise<Player> {
    const updatedPlayers = this.players.map((data) =>
      data.id === player_id
        ? {
            ...data,
            position: data.position + steps,
            round: Math.floor((data.position + steps) / MAX_GAME_BUILDINGS),
          }
        : data
    );

    this.players = updatedPlayers;

    const updatedPlayer = await this.findById(player_id);

    return updatedPlayer!;
  }

  async setPlayerCategory({
    player_id,
    category,
  }: UpdatePlayerCategoryDTO): Promise<Player> {
    const updatedPlayers = this.players.map((data) =>
      data.id === player_id
        ? {
            ...data,
            category,
          }
        : data
    );

    this.players = updatedPlayers;

    const updatedPlayer = await this.findById(player_id);

    return updatedPlayer!;
  }
}
