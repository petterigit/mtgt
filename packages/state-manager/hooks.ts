import { create } from 'zustand';
import { GameStateActions } from './types';
import { GameState, Player, PlayerAttribute } from 'types';
import { initialPlayer, initialState } from './inits';

const useGameStateStore = create<GameState & GameStateActions>(set => ({
    ...initialState,
    setGameState: (gamestate: GameState) => set(state => gamestate),
    setPlayerAttribute: <T extends PlayerAttribute>(id: string, value: Player[T], attribute: T) =>
        set(state => {
            const newPlayers = [...state.players];

            for (const player of newPlayers) {
                if (player.id !== id) continue;
                player[attribute] = value;
                break;
            }

            return { players: newPlayers };
        }),
    setGameID: id => set(state => ({ id: id })),
    addPlayer: () => set(state => ({ players: [...state.players, initialPlayer()] })),
    reset: (gameId: string) =>
        set({
            ...initialState,
            id: gameId,
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

export const useSetPlayerAttribute = () => ({
    set: useGameStateStore(state => state.setPlayerAttribute),
});

export const useSetGameState = () => ({
    set: useGameStateStore(state => state.setGameState),
});
