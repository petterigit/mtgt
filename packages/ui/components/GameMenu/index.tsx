import { cn } from '../../util/util';
import { Button } from '../Button';
import './gamemenu.css';
import { useEffect, useRef } from 'react';

interface Props {
    open: boolean;
    addPlayer: () => void;
    leaveGame: () => void;
    onClose: () => void;
}

export const GameMenu = (props: Props) => {
    const { open, addPlayer, leaveGame, onClose } = props;

    return (
        <div
            className={cn(open ? 'game-menu-backdrop-open' : 'game-menu-backdrop-closed')}
            onClick={e => {
                e.stopPropagation();
                onClose();
            }}
        >
            <dialog
                className="game-menu-dialog"
                open={open}
                onClick={e => e.stopPropagation()}
                onCancel={e => {
                    e.preventDefault();
                    onClose();
                }}
            >
                <div className="game-menu-contents">
                    <Button className="game-menu-button" onClick={addPlayer}>
                        Add a player
                    </Button>
                    <Button className="game-menu-button" onClick={onClose}>
                        Back to game
                    </Button>
                    <Button className="game-menu-button" onClick={leaveGame} primary={false}>
                        Leave game
                    </Button>
                </div>
            </dialog>
        </div>
    );
};
