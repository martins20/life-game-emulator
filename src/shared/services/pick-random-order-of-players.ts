import { Player } from "@shared/entities/player";

export class PickRandomOrderOfPlayersService {
  callsCounter = 0;

  constructor() {
    this.callsCounter += 1;
  }

  private suffleArray(players: Player[]): Player[] {
    const sortedPlayers = players
      .map((data) => ({ data, sort: Math.random() }))
      .sort((a, b) => b.sort - a.sort)
      .map(({ data }) => data);

    const isSameData = sortedPlayers.every(
      (data, index) => players[index].name === data.name
    );

    if (!isSameData) return sortedPlayers;

    return this.suffleArray(sortedPlayers);
  }

  execute(data: Player[]): Player[] {
    const sortedPlayers = this.suffleArray(data);

    return sortedPlayers;
  }
}
