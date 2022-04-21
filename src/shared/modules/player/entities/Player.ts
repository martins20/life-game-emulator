import { PlayerCategory } from "@shared/modules/category/modules/player-category/entities/PlayerCategory";
import { DEFAULT_PLAYER_BALANCE } from "@shared/constants/default-player-balance";

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
