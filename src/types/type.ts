import { DocumentReference } from "@firebase/firestore";

export interface User {
  uid: string;
  email: string;
  phoneNum: number;
  authProvider: "google" | "twitter" | "phone";
  name: string;
  chatList: DocumentReference;
}

export interface Room {
  users: DocumentReference[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  user: DocumentReference;
  room: DocumentReference;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatList {
  user: DocumentReference;
  rooms: DocumentReference[];
}

export interface Follows {
  userFrom: DocumentReference;
  userTo: DocumentReference;
}
