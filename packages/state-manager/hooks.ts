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

            return { version: state.version + 1, players: newPlayers };
        }),
    addPlayer: () => set(state => ({ version: state.version + 1, players: [...state.players, initialPlayer()] })),
    removePlayer: (id: string) =>
        set(state => {
            const newPlayers = state.players.filter(player => player.id !== id);
            return { version: state.version + 1, players: newPlayers };
        }),
    reset: () =>
        set({
            ...initialState,
        }),
}));

export const useGameState = () => {
    return useGameStateStore(state => ({
        version: state.version,
        players: state.players,
    }));
};

export const usePlayers = () => {
    return useGameStateStore(state => state.players);
};

export const useAddPlayer = () => {
    return useGameStateStore(state => state.addPlayer);
};

export const useRemovePlayer = () => {
    return useGameStateStore(state => state.removePlayer);
};

export const useSetPlayerAttribute = () => {
    return useGameStateStore(state => state.setPlayerAttribute);
};

export const useSetGameState = () => {
    return useGameStateStore(state => state.setGameState);
};
export const useResetGameState = () => {
    return useGameStateStore(state => state.reset);
};
