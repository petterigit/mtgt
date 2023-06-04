import { Player, PlayerAttribute } from 'types';

export interface GameStateActions {
    addPlayer: () => void;
    setPlayerAttribute: <T extends PlayerAttribute>(id: string, value: Player[T], attribute: T) => void;
    setGameID: (id: string) => void;
    reset: (gameID: string) => void;
}
