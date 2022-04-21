import { PlayerType } from "@modules/type/modules/player/entities/PlayerType";

import { DEFAULT_PLAYER_BALANCE } from "@shared/constants/default-player-balance";

export class Player {
  id: string;
  balance: number;

  player_type: PlayerType | null = null;

  constructor(public name: string) {
    this.balance = DEFAULT_PLAYER_BALANCE;
  }
}
