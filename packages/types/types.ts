export interface GameState {
    id: string;
    players: Player[];
}

export interface Player {
    name: string;
    id: string;
    commanders: string[];
    life: number;
    poison: number;
    experience: number;
    energy: number;
    tickets: number;
    monarch: boolean;
    initiative: boolean;
}

export type PlayerNumberAttributes = 'life' | 'poison' | 'experience' | 'energy' | 'tickets';
export type PlayerBooleanAttributes = 'monarch' | 'initiative';
export type PlayerAttributes = PlayerNumberAttributes | PlayerBooleanAttributes;
