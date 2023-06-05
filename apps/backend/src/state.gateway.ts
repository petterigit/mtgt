import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway(5080, {
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
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world!';
  }
  @SubscribeMessage('state')
  handleState(client: Socket, payload: any): string {
    console.log(payload);
    return 'State received, thanks fam';
  }
}