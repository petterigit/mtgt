import { useRouter } from 'next/router';
import { LobbyContainer } from 'ui';

const Web = () => {
    const router = useRouter();

    const newGame = () => {
        const randomGameID = Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, '0');

        router.push(`/game/${randomGameID}`);
    };

    const joinGame = (gameID: string) => {
        router.push(`/game/${gameID}`);
    };

    return <LobbyContainer createGame={newGame} joinGame={value => joinGame(value)}></LobbyContainer>;
};

export default Web;
