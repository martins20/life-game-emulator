import { DEFAULT_PLAYER_BALANCE } from "@shared/constants/default-player-balance";

export class Player {
  balance: number;

  constructor(public name: string) {
    this.balance = DEFAULT_PLAYER_BALANCE;
  }
}
