import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAddPlayer, useGameState } from 'state-manager';
import { usePlayers, useSetGameID, useSetGameState, useSetPlayerAttribute } from 'state-manager/hooks';
import { Player as PlayerType, PlayerAttribute, GameState } from 'types';
import { GameContainer, GameMenu, GameMenuButton, Player, PlayersContainer } from 'ui';
import { socket } from '..';

const Game = () => {
    const router = useRouter();
    const { gameId } = router.query;
    const [openModal, setOpenModal] = useState(false);

    const addPlayer = useAddPlayer();
    const { set } = useSetPlayerAttribute();
    const players = usePlayers();
    const setGameID = useSetGameID();
    const gameState = useGameState();
    const setGameState = useSetGameState();

    const postGameState = () => {
        axios
            .post('http://localhost:5000/update', {
                roomId: gameId,
                socketId: socket.id,
                state: gameState,
            })
          
    }

    // Whenever the game state changes, we need to update the state to other users.
    useEffect(() => {
      postGameState();
    }, [gameState]);



    useEffect(() => {
        const stateHandler = (state: any) => {
            setGameState.set(state);
        };
        const forceUpdateHandler = postGameState
        const youAreTheMasterNowHandler = () => {
            console.log('Olen nyt pää');
        };

        socket.on('state', stateHandler);
        socket.on('forceUpdate', forceUpdateHandler);
        socket.on('youAreTheMasterNow', youAreTheMasterNowHandler);

        return () => {
            // When leaving game, disconnect socket. Connection when joining
            socket.disconnect();
            /*
            socket.off('state', stateHandler);
            socket.off('forceUpdate', forceUpdateHandler);
            socket.off('youAreTheMasterNow', youAreTheMasterNowHandler);
            */
        };
    }, []);

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
        set(playerId, newValue, attribute);
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
