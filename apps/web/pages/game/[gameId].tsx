import { useRouter } from 'next/router';
import { PropsWithChildren, useState } from 'react';
import { GameStateProvider, useGameStateStore } from 'state-manager';
import { GameContainer, GameMenu, GameMenuButton, Player, PlayersContainer } from 'ui';

const GameWithProviders = (props: PropsWithChildren) => {
    const { children } = props;
    return (
        <GameStateProvider>
            <Game />
        </GameStateProvider>
    );
};

const Game = () => {
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

    const store = useGameStateStore();

    console.log(store.getState());

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

export default GameWithProviders;
