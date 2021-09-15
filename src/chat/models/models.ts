export interface MessageI {
  roomname: string;
  userName: string;
  content: string;
  date: string;
  type: string;
  key?: string;
}
export interface RoomI {
  roomname: string;
  key?: string;
}

export interface UserCre {
  userId: string;
  userName: string;
}




