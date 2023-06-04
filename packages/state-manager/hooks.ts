import { create } from 'zustand';
import { GameStateActions } from './types';
import { GameState, Player, PlayerAttributes, PlayerBooleanAttributes, PlayerNumberAttributes } from 'types';
import { initialPlayer, initialState } from './inits';

const useGameStateStore = create<GameState & GameStateActions>(set => ({
    ...initialState,
    setPlayerNumberAttribute: (id: string, value: number, attribute: PlayerNumberAttributes) =>
        set(state => {
            const newPlayers = [...state.players];

            for (const player of newPlayers) {
                if (player.id !== id) continue;
                player[attribute] = value;
                break;
            }

            return { players: newPlayers };
        }),
    setPlayerBooleanAttribute: (id: string, value: boolean, attribute: PlayerBooleanAttributes) =>
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
    setBoolean: useGameStateStore(state => state.setPlayerBooleanAttribute),
    setNumber: useGameStateStore(state => state.setPlayerNumberAttribute),
});
