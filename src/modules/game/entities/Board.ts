import { Property } from "@shared/modules/property/entities/Property";
import { Player } from "@shared/modules/player/entities/Player";

export class Board {
  buildings: Property[];
  players: Player[];
}

// Responsável pelo movimento do player às propriedades
