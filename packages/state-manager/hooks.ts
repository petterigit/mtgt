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
    reset: () =>
        set({
            ...initialState,
        }),
}));

export const useGameState = () => {
    return useGameStateStore(state => ({
        players: state.players,
        version: state.version,
    }));
};

export const usePlayers = () => {
    return useGameStateStore(state => state.players);
};

export const useAddPlayer = () => {
    return useGameStateStore(state => state.addPlayer);
};

export const useSetPlayerAttribute = () => {
    return useGameStateStore(state => state.setPlayerAttribute);
};

export const useSetGameState = () => {
    return useGameStateStore(state => state.setGameState);
};
