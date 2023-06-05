import { Injectable } from '@nestjs/common';
import { getRooms, RoomId, setRooms, SocketId } from './rooms';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getRoom(id: RoomId) {
    const room = getRooms().find((room) => room.id === id);

    return room;
  }

  getRoomMainSocketId(id: RoomId) {
    const room = this.getRoom(id);

    return room!.mainSocketId;
  }

  createRoom(id: RoomId, socketId: SocketId) {
    const rooms = getRooms();
    const room = rooms.find((room) => room.id === id);

    if (!room) {
      const newRoom = {
        id,
        socketIds: new Set<SocketId>(),
        mainSocketId: socketId,
      };

      newRoom.socketIds.add(socketId);

      setRooms([...rooms, newRoom]);

      return { room: newRoom, created: true };
    }

    room.socketIds.add(socketId);

    setRooms(rooms);

    return { room, created: false };
  }
}
