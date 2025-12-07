export type SocketId = string;
export type SocketIds = Set<SocketId>;
export type RoomId = string;
export type Room = {
  mainSocketId: SocketId;
  socketIds: SocketIds;
  id: RoomId;
};

let rooms: Room[] = [];

export const getRooms = () => rooms;
export const setRooms = (newRooms: Room[]) => {
  rooms = newRooms;
};
