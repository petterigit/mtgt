import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAddPlayer, useGameState } from 'state-manager';
import {
    usePlayers,
    useRemovePlayer,
    useResetGameState,
    useSetGameState,
    useSetPlayerAttribute,
} from 'state-manager/hooks';
import { Player as PlayerType, PlayerAttribute, GameState } from 'types';
import { GameContainer, GameMenu, Player, PlayersContainer } from 'ui';
import { joinGame, updateState } from '../rest-api';
import { socket } from '../socket-api';

const Game = () => {
    const router = useRouter();
    const { gameId } = router.query;
    const addPlayer = useAddPlayer();
    const removePlayer = useRemovePlayer();
    const setPlayerAttribute = useSetPlayerAttribute();
    const players = usePlayers();
    const [openModal, setOpenModal] = useState(players.length === 0);
    const gameState = useGameState();
    const setGameState = useSetGameState();
    const resetGameState = useResetGameState();

    const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');

    useEffect(() => {
        const handleConnect = () => setConnectionStatus('connected');
        const handleDisconnect = () => setConnectionStatus('disconnected');
        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        setConnectionStatus(socket.connected ? 'connected' : 'disconnected');
        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
        };
    }, []);

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
    }, [gameState.version]);

    useEffect(() => {
        let tried = false;
        if (!socket.connected && !tried) {
            socket.connect();
            tried = true;
        }
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
    }, []);

    const tryConnection = () => {
        setConnectionStatus('connecting');
        socket.connect();
        setTimeout(() => {
            if (!socket.connected) {
                setConnectionStatus('disconnected');
            }
        }, 5000);
    };

    useEffect(() => {
        const warningText = 'The current game will be lost if you leave. Are you sure?';

        const handleWindowClose = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            return (e.returnValue = warningText);
        };

        const handleBrowseAway = () => {
            if (window.confirm(warningText)) return;
            router.events.emit('routeChangeError');
            throw 'routeChange aborted.';
        };

        window.addEventListener('beforeunload', handleWindowClose);
        router.events.on('routeChangeStart', handleBrowseAway);

        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
            router.events.off('routeChangeStart', handleBrowseAway);
        };
    }, [router.events]);

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
        <GameContainer
            connectionStatus={connectionStatus}
            tryConnection={tryConnection}
            gameId={gameId?.toString()}
            backToHome={leaveGame}
            openGameMenu={() => setOpenModal(prev => !prev)}
        >
            <PlayersContainer>
                {players.map((player, i) => (
                    <Player
                        key={`player-${i}`}
                        addAttribute={handleChangeAttribute}
                        removeAttribute={handleChangeAttribute}
                        removePlayer={() => {
                            const confirmText = `Remove ${player.name}?`;
                            if (window.confirm(confirmText)) {
                                removePlayer(player.id);
                            }
                        }}
                        {...player}
                    />
                ))}
            </PlayersContainer>

            <GameMenu open={openModal} addPlayer={addPlayer} leaveGame={leaveGame} onClose={onClose} />
        </GameContainer>
    );
};

export default Game;
