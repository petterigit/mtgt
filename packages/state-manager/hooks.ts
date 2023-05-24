import { useContext } from 'react';
import { GameStateContext } from './GameStateContext';

export const useGameStateStore = () => {
    const context = useContext(GameStateContext);
    if (!context) {
        throw new Error('Use game state must be used within GameStateProvider');
    }

    return context;
};
