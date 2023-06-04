import { PlayerBooleanAttributes, PlayerNumberAttributes } from 'types';

export interface GameStateActions {
    addPlayer: () => void;
    setPlayerNumberAttribute: (id: string, value: number, attribute: PlayerNumberAttributes) => void;
    setPlayerBooleanAttribute: (id: string, value: boolean, attribute: PlayerBooleanAttributes) => void;
    setGameID: (id: string) => void;
    reset: (gameID: string) => void;
}
