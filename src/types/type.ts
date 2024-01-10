export interface User {
  uid: string;
  email: string;
  phoneNum: number;
  authProvider: "google" | "twitter" | "phone";
  name: string;
  chatList: ChatList;
}

export interface Room {
  users: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  user: User;
  room: Room;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatList {
  user: User;
  rooms: Room[];
}

export interface Follows {
  userFrom: User;
  userTo: User;
}
