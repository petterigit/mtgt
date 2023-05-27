import { GameState, Player } from 'types';
import { createUniqueName, generateId } from 'utils';

export const initialState: GameState = {
    id: '',
    players: [],
};

export const initialPlayer = () => ({
    name: createUniqueName(),
    life: 40,
    poison: 0,
    id: generateId(),
});
