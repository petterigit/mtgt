import { PropsWithChildren } from 'react';

import './gamecontainer.css';
import { Button } from '../Button';

interface GameContainerProps extends PropsWithChildren {
    gameId: string;
    backToHome: () => void;
    openGameMenu: () => void;
    connectionStatus: 'connected' | 'disconnected' | 'connecting';
    tryConnection: () => void;
}

export const GameContainer = (props: GameContainerProps) => {
    const { children, backToHome, openGameMenu, tryConnection, gameId, connectionStatus } = props;
    return (
        <div className="game-container">
            <div className="game-container-header">
                <Button onClick={backToHome} primary={false}>
                    Leave game
                </Button>
                <Button onClick={openGameMenu} primary={false}>
                    Menu
                </Button>
                <p style={{ marginLeft: 'auto' }}>Room ID: {gameId}</p>
                <div
                    className="connection-status"
                    title={`Connection: ${connectionStatus}`}
                    aria-label={`Connection: ${connectionStatus}`}
                >
                    <span className={`status-dot ${connectionStatus}`} />
                </div>
                {connectionStatus === 'disconnected' && (
                    <Button onClick={tryConnection} primary={false}>
                        Reconnect
                    </Button>
                )}
            </div>
            {children}
        </div>
    );
};
