import { useRouter } from 'next/router';
import { LobbyContainer } from 'ui';
import axios from 'axios';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:5080');

const Web = () => {
    const router = useRouter();

    const newGame = () => {
        const randomGameID = Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, '0');

        axios
            .post('http://localhost:5000/join', {
                roomId: randomGameID,
                socketId: socket.id,
            })
            .then(res => {
                if (res.status === 200) {
                    console.log('en oo pää');
                }
                if (res.status === 201) {
                    console.log('olen pää');
                }
                console.log('liityttiin tai jotain', res);

                router.push(`/game/${randomGameID}`);
            });
    };

    const joinGame = (gameID: string) => {
        axios
            .post('http://localhost:5000/join', {
                roomId: gameID,
                socketId: socket.id,
            })
            .then(res => {
                if (res.status === 200) {
                    console.log('en oo pää');
                }
                if (res.status === 201) {
                    console.log('olen pää');
                }
                console.log('liityttiin tai jotain', res);

                router.push(`/game/${gameID}`);
            });
    };

    return <LobbyContainer createGame={newGame} joinGame={value => joinGame(value)}></LobbyContainer>;
};

export default Web;
