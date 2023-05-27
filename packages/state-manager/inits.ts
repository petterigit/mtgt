import { GameState, Player } from 'types';
import { generateId } from 'utils';

export const initialState: GameState = {
    id: '',
    players: [],
};

export const initialPlayer: () => Player = () => ({
    name: 'New Player',
    life: 40,
    poison: 0,
    id: generateId(),
});
