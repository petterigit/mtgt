export interface GameState {
    gameID: string;
    players: number;
}

export interface GameStateActions {
    addPlayer: (by: number) => void;
    setGameID: (id: string) => void;
    reset: (gameID: string) => void;
}
