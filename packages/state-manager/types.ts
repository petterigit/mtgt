import { PlayerBooleanAttribute, PlayerNumberAttribute } from 'types';

export interface GameStateActions {
    addPlayer: () => void;
    setPlayerNumberAttribute: (id: string, value: number, attribute: PlayerNumberAttribute) => void;
    setPlayerBooleanAttribute: (id: string, value: boolean, attribute: PlayerBooleanAttribute) => void;
    setGameID: (id: string) => void;
    reset: (gameID: string) => void;
}
