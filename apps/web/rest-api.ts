import axios from 'axios';
import { GameState } from 'types';

axios.defaults.baseURL = 'http://localhost:5000';

export const updateState = (state: GameState, roomId: string | string[], socketId: string) => {
    if (typeof roomId !== 'string') return; // TODO: this somewhere else
    axios.post('/update', {
        roomId: roomId,
        socketId: socketId,
        state: state,
    });
};

export const joinGame = (roomId: string | string[], socketId: string) => {
    if (typeof roomId !== 'string') return; // TODO: this somewhere else
    axios.post('/join', {
        roomId: roomId,
        socketId: socketId,
    });
};
