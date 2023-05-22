import { useRouter } from 'next/router';
import { useState } from 'react';
import { GameContainer, GameMenu, GameMenuButton, Player, PlayersContainer } from 'ui';

export const Game = () => {
    const router = useRouter();
    const { gameId } = router.query;

    const [players, setPlayers] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const addPlayer = () => {
        const newPlayers = [...players, `player-${players.length}`];
        setPlayers(newPlayers);
    };

    const leaveGame = () => {
        router.push('/');
    };

    const onClose = () => {
        setOpenModal(false);
    };

    return (
        <GameContainer>
            <PlayersContainer>
                {players.map((player, i) => (
                    <Player key={`player-${i}`} name={player} life={40} />
                ))}
            </PlayersContainer>
            <div style={{ alignSelf: 'center' }}>
                <GameMenuButton onClick={() => setOpenModal(true)} />
            </div>
            <GameMenu open={openModal} addPlayer={addPlayer} leaveGame={leaveGame} onClose={onClose} />
        </GameContainer>
    );
};

export default Game;
