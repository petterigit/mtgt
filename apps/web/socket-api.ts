import { io } from 'socket.io-client';

const baseURL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:5080';

export const socket = io(baseURL, {
    autoConnect: false,
});

