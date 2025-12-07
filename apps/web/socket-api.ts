import { io } from 'socket.io-client';

const baseURL = 'http://localhost:5080';

export const socket = io(baseURL, {
    autoConnect: false,
});
