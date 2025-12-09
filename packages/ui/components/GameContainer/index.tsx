import { PropsWithChildren } from 'react';

import './gamecontainer.css';
import { Button } from '../Button';

interface GameContainerProps extends PropsWithChildren {
    gameId: string;
    backToHome: () => void;
    openGameMenu: () => void;
}

export const GameContainer = (props: GameContainerProps) => {
    const { children, backToHome, openGameMenu, gameId } = props;
    return (
        <div className="game-container">
            <div className="game-container-header">
                <Button onClick={backToHome} primary={false}>
                    Back to Home
                </Button>
                <Button onClick={openGameMenu} primary={false}>
                    Menu
                </Button>
                <p style={{ marginLeft: 'auto' }}>Room ID: {gameId}</p>
            </div>
            {children}
        </div>
    );
};
