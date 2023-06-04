import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAddPlayer, useGameState } from 'state-manager';
import { usePlayers, useSetGameID, useSetPlayerAttribute } from 'state-manager/hooks';
import { Player as PlayerType, PlayerAttribute, PlayerBooleanAttribute, PlayerNumberAttribute } from 'types';
import { GameContainer, GameMenu, GameMenuButton, Player, PlayersContainer } from 'ui';

const Game = () => {
    const router = useRouter();
    const { gameId } = router.query;
    const [openModal, setOpenModal] = useState(false);

    const addPlayer = useAddPlayer();
    const { setBoolean, setNumber } = useSetPlayerAttribute();
    const players = usePlayers();
    const setGameID = useSetGameID();

    // Set ID of state whenever it changes
    useEffect(() => {
        if (typeof gameId !== 'string') {
            return;
        }
        setGameID(gameId);
    }, [gameId, setGameID]);

    const leaveGame = () => {
        router.push('/');
    };

    const onClose = () => {
        setOpenModal(false);
    };

    const handleChangeAttribute = <T extends PlayerAttribute>(
        playerId: string,
        attribute: T,
        newValue: PlayerType[T]
    ) => {
        switch (typeof newValue) {
            case 'boolean':
                setBoolean(playerId, newValue, attribute as PlayerBooleanAttribute); // We know it's boolean, but this should be fixed
                break;
            case 'number':
                setNumber(playerId, newValue, attribute as PlayerNumberAttribute); // We know it's number, but this should be fixed
                break;
        }
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
                        addAttribute={handleChangeAttribute}
                        removeAttribute={handleChangeAttribute}
                        {...player}
                    />
                ))}
            </PlayersContainer>

            <GameMenu open={openModal} addPlayer={addPlayer} leaveGame={leaveGame} onClose={onClose} />
        </GameContainer>
    );
};

export default Game;
