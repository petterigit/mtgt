import { PlayerAttributes } from 'types';

export interface GameStateActions {
    addPlayer: () => void;
    setPlayerAttribute: (id: string, value: number, attribute: PlayerAttributes) => void;
    setGameID: (id: string) => void;
    reset: (gameID: string) => void;
}
