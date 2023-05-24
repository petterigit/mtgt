import { create } from 'zustand';
import { GameState, GameStateActions } from './types';

const initialState: GameState = {
    gameID: '',
    players: 0,
};

const useGameStateStore = create<GameState & GameStateActions>(set => ({
    gameID: '',
    players: 0,
    setGameID: id => set(state => ({ gameID: id })),
    addPlayer: by => set(state => ({ players: state.players + by })),
    reset: (gameID: string) =>
        set({
            ...initialState,
            gameID: gameID,
        }),
}));

export const useGameState = () => {
    return useGameStateStore(state => state);
};

export const useSetGameID = () => {
    return useGameStateStore(state => state.setGameID);
};

export const usePlayers = () => {
    return useGameStateStore(state => state.players);
};

export const useAddPlayer = () => {
    return useGameStateStore(state => state.addPlayer);
};
