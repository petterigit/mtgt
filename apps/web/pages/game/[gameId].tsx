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
            <div style={{ alignSelf: 'center', padding: '8em' }}>
                <GameMenuButton onClick={() => setOpenModal(true)} />
            </div>
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

            <GameMenu open={openModal} addPlayer={addPlayer} leaveGame={leaveGame} onClose={onClose} />
        </GameContainer>
    );
};

export default Game;
