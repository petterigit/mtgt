import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAddPlayer, useGameState } from 'state-manager';
import { usePlayers, useSetGameID, useSetPlayerAttribute } from 'state-manager/hooks';
import { PlayerAttributes } from 'types';
import { GameContainer, GameMenu, GameMenuButton, Player, PlayersContainer } from 'ui';

const Game = () => {
    const router = useRouter();
    const { gameId } = router.query;
    const [openModal, setOpenModal] = useState(false);

    const addPlayer = useAddPlayer();
    const setPlayerAttribute = useSetPlayerAttribute();
    const state = useGameState();
    const players = usePlayers();
    const setGameID = useSetGameID();

    // Set ID of state whenever it changes
    useEffect(() => {
        if (typeof gameId !== 'string') {
            return;
        }
        setGameID(gameId);
    }, [gameId]);

    const leaveGame = () => {
        router.push('/');
    };

    const onClose = () => {
        setOpenModal(false);
    };

    const handleAddAttribute = (playerId: string, attribute: PlayerAttributes, newValue: number) => {
        setPlayerAttribute(playerId, newValue, attribute);
    };

    const handleRemoveAttribute = (playerId: string, attribute: PlayerAttributes, newValue: number) => {
        setPlayerAttribute(playerId, newValue, attribute);
    };

    return (
        <GameContainer>
            <h1>Game {state.id}</h1>
            <h2>Players: {players.length}</h2>
            <PlayersContainer>
                {players.map((player, i) => (
                    <Player
                        key={`player-${i}`}
                        addAttribute={handleAddAttribute}
                        removeAttribute={handleRemoveAttribute}
                        id={player.id}
                        name={player.name}
                        life={player.life}
                        poison={player.poison}
                    />
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
