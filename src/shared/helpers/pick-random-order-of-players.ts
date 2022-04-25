import { Player } from "@shared/modules/player/entities/Player";

const suffleArray = (players: Player[]): Player[] => {
  const sortedPlayers = players
    .map((data) => ({ data, sort: Math.random() }))
    .sort((a, b) => b.sort - a.sort)
    .map(({ data }) => data);

  const isSameData = sortedPlayers.every(
    (data, index) => players[index].name === data.name
  );

  if (!isSameData) return sortedPlayers;

  return suffleArray(sortedPlayers);
};

export function pickRandomOrderOfPlayersHelper(data: Player[]): Player[] {
  const sortedPlayers = suffleArray(data);

  return sortedPlayers;
}
