type NumberKeys<T> = { [K in keyof T]: T[K] extends number ? K : never }[keyof T];
type BooleanKeys<T> = { [K in keyof T]: T[K] extends boolean ? K : never }[keyof T];

export interface GameState {
    players: Player[];
    version: number;
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

type ChangeablePlayer = Omit<Player, 'name' | 'id'>;

export type PlayerAttribute = keyof ChangeablePlayer;
export type NumberPlayerAttribute = NumberKeys<ChangeablePlayer>;
export type BooleanPlayerAttribute = BooleanKeys<ChangeablePlayer>;
