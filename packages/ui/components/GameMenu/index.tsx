import { Button } from '../Button';
import './gamemenu.css';

interface Props {
    open: boolean;
    addPlayer: () => void;
    leaveGame: () => void;
    onClose: () => void;
}

export const GameMenu = (props: Props) => {
    const { open, addPlayer, leaveGame, onClose } = props;
    return (
        <dialog className="game-menu-dialog" open={open}>
            <div className="game-menu-contents">
                <h2>Options</h2>
                <Button onClick={addPlayer}>Add a player</Button>
                <Button onClick={leaveGame}>Leave game</Button>
                <Button onClick={onClose}>Close game menu</Button>
            </div>
        </dialog>
    );
};
