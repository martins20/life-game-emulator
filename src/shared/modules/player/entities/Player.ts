import { DEFAULT_PLAYER_BALANCE } from "@shared/modules/player/constants/default-player-balance";
import { PlayerCategory } from "@shared/modules/category/modules/player-category/entities/PlayerCategory";

export class Player {
  id: string;
  balance: number;
  position = 0;
  turn_counter = 0;

  category: PlayerCategory | null = null;

  constructor(public name: string) {
    this.balance = DEFAULT_PLAYER_BALANCE;
  }
}
