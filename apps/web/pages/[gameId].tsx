import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useAddPlayer, useGameState } from 'state-manager';
import { usePlayers, useResetGameState, useSetGameState, useSetPlayerAttribute } from 'state-manager/hooks';
import { Player as PlayerType, PlayerAttribute, GameState } from 'types';
import { GameContainer, GameMenu, GameMenuButton, Player, PlayersContainer } from 'ui';
import { joinGame, updateState } from '../rest-api';
import { socket } from '../socket-api';

const Game = () => {
    const router = useRouter();
    const { gameId } = router.query;
    const [openModal, setOpenModal] = useState(false);
    const addPlayer = useAddPlayer();
    const setPlayerAttribute = useSetPlayerAttribute();
    const players = usePlayers();
    const gameState = useGameState();
    const setGameState = useSetGameState();
    const resetGameState = useResetGameState();

    useEffect(() => {
        const stateHandler = (state: GameState) => {
            if (state.version <= gameState.version) {
                return;
            }
            setGameState(state);
        };

        const onForceUpdate = () => {
            updateState(gameState, gameId, socket.id);
        };

        socket.on('state', stateHandler);
        socket.on('force-update-state', onForceUpdate);

        if (!socket?.connected) return;
        updateState(gameState, gameId, socket.id);

        return () => {
            socket.off('state', stateHandler);
            socket.off('force-update-state', onForceUpdate);
        };
        // Should have more deps but doesn't work :c
        // gameId, gameState, setGameState
    }, [gameState.version]);

    useEffect(() => {
        socket.connect();
        if (gameState.version !== 0) {
            resetGameState();
        }

        const onConnect = () => {
            joinGame(gameId, socket.id);
        };

        socket.on('connect', onConnect);

        return () => {
            socket.off('connect', onConnect);
            socket.disconnect();
        };
        // Should have more deps but doesn't work :c
        // gameId, gameState.version, resetGameState
    }, []);

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
