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

export type PlayerNumberAttribute = 'life' | 'poison' | 'experience' | 'energy' | 'tickets';
export type PlayerBooleanAttribute = 'monarch' | 'initiative';
// export type PlayerAttribute = PlayerNumberAttribute | PlayerBooleanAttribute;
export type PlayerAttribute = keyof Omit<Player, 'name' | 'id'>;
