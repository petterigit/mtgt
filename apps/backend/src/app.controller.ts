import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { RoomId, SocketId, getRooms } from './rooms';
import { StateGateway } from './state.gateway';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly stateGateway: StateGateway,
  ) {}

  @Get('ping')
  getPingPong(): string {
    return 'pong';
  }

  @Post('join')
  joinRoom(
    @Res() response: Response,
    @Body('socketId') socketId: SocketId,
    @Body('roomId') roomId: RoomId,
  ) {
    const { created } = this.appService.createRoom(roomId, socketId);

    if (created) {
      response.status(HttpStatus.CREATED).send();
    } else {
      response.status(HttpStatus.OK).send();
      const mainSocketId = this.appService.getRoomMainSocketId(roomId);

      // Force update might be required when joining game even if not implemented in frontend
      this.stateGateway.server.to(mainSocketId).emit('forceUpdate');
    }
  }

  @Post('update')
  updateState(
    @Res() response: Response,
    @Body('socketId') socketId: SocketId,
    @Body('roomId') roomId: RoomId,
    @Body('state') state: unknown,
  ) {
    const room = this.appService.getRoom(roomId);

    if (!room) {
      response
        .status(HttpStatus.AMBIGUOUS)
        .send('Could not find room with given roomId');
      return;
    }

    if (!room.socketIds.has(socketId)) {
      response
        .status(HttpStatus.UNAUTHORIZED)
        .send('You are not permitted to update this room');
      return;
    }

    room.socketIds.forEach((id) => {
      this.stateGateway.server.to(id).emit('state', state);
    });

    response.status(HttpStatus.OK).send();
  }
}
