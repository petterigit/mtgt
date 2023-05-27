export interface GameState {
    id: string;
    players: Player[];
}

export interface Player {
    name: string;
    life: number;
    poison: number;
    id: string;
}

export type PlayerAttributes = 'life' | 'poison';
