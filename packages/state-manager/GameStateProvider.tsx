import { PropsWithChildren, useEffect, useState } from 'react';
import { createGameStore } from './createGameStore';
import { GameStateContext } from './GameStateContext';
import { GameState } from './types';

export const GameStateProvider = (props: PropsWithChildren) => {
    const { children } = props;

    const [store, setStore] = useState<ReturnType<typeof createGameStore>>(createGameStore());

    return <GameStateContext.Provider value={store}>{children}</GameStateContext.Provider>;
};
