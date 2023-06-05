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
    }
  }

  @Post('update')
  updateState(
    @Res() response: Response,
    @Body('socketId') socketId: SocketId,
    @Body('roomId') roomId: RoomId,
    @Body('state') state: unknown,
  ) {
    console.log(getRooms());

    const room = this.appService.getRoom(roomId);

    if (!room) {
      response.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    if (!room.socketIds.has(socketId)) {
      response.status(HttpStatus.UNAUTHORIZED).send();
      return;
    }

    const mainSocketId = this.appService.getRoomMainSocketId(roomId);

    if (mainSocketId === socketId) {
      room.socketIds.forEach((id) => {
        if (id !== mainSocketId) {
          this.stateGateway.server.to(socketId).emit('state', state);
        }
      });
    } else {
      this.stateGateway.server.to(mainSocketId).emit('state', state);
    }

    response.status(HttpStatus.OK).send();
  }
}
