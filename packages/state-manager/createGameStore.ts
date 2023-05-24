import { createStore } from 'zustand';
import { GameState } from './types';
import { devtools, persist } from 'zustand/middleware';

export const createGameStore = () => {
    const store = createStore<GameState>()(
        devtools(
            persist(
                set => ({
                    bears: 0,
                    increase: by => set(state => ({ bears: state.bears + by })),
                }),
                {
                    name: 'bear-storage',
                }
            )
        )
    );
    return store;
};
