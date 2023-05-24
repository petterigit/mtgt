import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAddPlayer, useGameState } from 'state-manager';
import { usePlayers, useSetGameID } from 'state-manager/hooks';
import { GameContainer, GameMenu, GameMenuButton, Player, PlayersContainer } from 'ui';

const Game = () => {
    const router = useRouter();
    const { gameId } = router.query;
    const [players, setPlayers] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const addPlayerToState = useAddPlayer();
    const state = useGameState();
    const playersAmount = usePlayers();
    const setGameID = useSetGameID();

    // Set ID of state whenever it changes
    useEffect(() => {
        if (typeof gameId !== 'string') {
            return;
        }
        setGameID(gameId);
    }, [gameId]);

    const addPlayer = () => {
        addPlayerToState(1);
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
            <h1>Game {state.gameID}</h1>
            <h2>Players: {playersAmount}</h2>
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
