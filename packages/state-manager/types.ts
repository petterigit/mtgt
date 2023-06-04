import { BooleanPlayerAttribute, NumberPlayerAttribute } from 'types';

export interface GameStateActions {
    addPlayer: () => void;
    setPlayerNumberAttribute: (id: string, value: number, attribute: NumberPlayerAttribute) => void;
    setPlayerBooleanAttribute: (id: string, value: boolean, attribute: BooleanPlayerAttribute) => void;
    setGameID: (id: string) => void;
    reset: (gameID: string) => void;
}
