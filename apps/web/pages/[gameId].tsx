import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAddPlayer, useGameState } from 'state-manager';
import { usePlayers, useSetGameState, useSetPlayerAttribute } from 'state-manager/hooks';
import { Player as PlayerType, PlayerAttribute, GameState } from 'types';
import { GameContainer, GameMenu, GameMenuButton, Player, PlayersContainer } from 'ui';
import { Socket, io } from 'socket.io-client';
import { updateState } from '../rest-api';

const Game = () => {
    const router = useRouter();
    const { gameId } = router.query;
    const [openModal, setOpenModal] = useState(false);
    const addPlayer = useAddPlayer();
    const setPlayerAttribute = useSetPlayerAttribute();
    const players = usePlayers();
    const gameState = useGameState();
    const setGameState = useSetGameState();
    const [socket, setSocket] = useState<Socket | null>(null);

    const stateHandler = (state: GameState) => {
        // If other clients send a state that is older, don't update
        if (state.version <= gameState.version) {
            return;
        }
        setGameState(state);
    };

    useEffect(() => {
        if (!socket?.connected) return;

        updateState(gameState, gameId, socket.id);
    }, [gameState.version]);

    useEffect(() => {
        const socket = io('http://localhost:5080');

        socket.on('connect', () => {
            setSocket(socket);
            axios.post('http://localhost:5000/join', {
                roomId: gameId,
                socketId: socket.id,
            });
        });

        socket.on('state', stateHandler);

        socket.on('force-update-state', () => {
            console.log('Force updating');
            updateState(gameState, gameId, socket.id);
        });

        return () => {
            socket.disconnect();
        };
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
