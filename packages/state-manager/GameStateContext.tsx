import { createContext } from 'react';
import { createGameStore } from './createGameStore';

export const GameStateContext = createContext<null | ReturnType<typeof createGameStore>>(null);
