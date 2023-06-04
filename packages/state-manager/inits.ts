import { GameState, Player } from 'types';
import { createUniqueName, generateId } from 'utils';

export const initialState: GameState = {
    id: '',
    players: [],
};

export const initialPlayer = (): Player => ({
    name: createUniqueName(),
    id: generateId(),
    commanders: [],
    life: 40,
    poison: 0,
    experience: 0,
    energy: 0,
    tickets: 0,
    monarch: false,
    initiative: false,
});
