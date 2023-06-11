import { GameState, Player, PlayerAttribute } from 'types';

export interface GameStateActions {
    addPlayer: () => void;
    setGameState: (gamestate: GameState) => void;
    setPlayerAttribute: <T extends PlayerAttribute>(id: string, value: Player[T], attribute: T) => void;
    reset: () => void;
}
