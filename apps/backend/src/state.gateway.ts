import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { getRooms, setRooms } from './rooms';

@Injectable()
@WebSocketGateway(parseInt(process.env.WEBSOCKET_PORT ?? '') ?? 5080, {
  cors: {
    origin: '*',
  },
})
export class StateGateway
  implements OnGatewayConnection<Socket>, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('connected, id:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('disconnected, id:', client.id);

    const rooms = getRooms();

    rooms.forEach((room) => {
      room.socketIds.delete(client.id);

      if (room.socketIds.size < 1) {
        rooms.splice(rooms.indexOf(room), 1);

        return;
      }
      const mainSocketId = room.mainSocketId;

      if (mainSocketId === client.id) {
        const newMainSocketId = room.socketIds.values().next().value;

        room.mainSocketId = newMainSocketId;

        this.server.to(newMainSocketId).emit('youAreTheMasterNow');
      }
    });

    setRooms(rooms);
  }
}
