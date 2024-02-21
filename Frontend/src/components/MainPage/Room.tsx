import React, { useEffect, useState } from "react";
import { getChatListSnapshot, getRoomSnapshot } from "../../api/api";
import { useParams } from "react-router-dom";
import { Message, Room as RoomType, User } from "../../types/type";
import {
  DocumentReference,
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import { firestore } from "../../firebase";
import MessageInput from "./MessageInput";
import { useSelector } from "react-redux";

const Room = () => {
  const { chatListId, roomId } = useParams();
  const [room, setRoom] = useState<RoomType | "invalid">(null);
  const [messages, setMessages] = useState<Message[]>(null);

  const roomRef = doc(firestore, "Room", roomId);

  const currentUser = useSelector((state: any) => state.auth.user as User);

  const getRoomData = async () => {
    const roomSnapshot = await getRoomSnapshot(roomId);
    const chatListSnapshot = await getChatListSnapshot(chatListId);
    const chatListRooms = chatListSnapshot.data().rooms as DocumentReference[];
    if (chatListRooms.filter((x) => x.id === roomRef.id).length === 0) {
      setRoom("invalid");
      return;
    }
    setRoom(roomSnapshot.data() as RoomType);
  };

  const fetchData = async () => {
    await getRoomData();
    // await getMessageData();
    const q = query(
      collection(firestore, "Message"),
      where("room", "==", roomRef)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      let data = [];
      snapshot.forEach((doc) => {
        data = [...data, doc.data()];
      });
      setMessages(data);
    });
    return () => {
      unsub();
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (room === "invalid") return <>INVALID ROOM!!!</>;

  if (!room || !messages) return <>Loading...</>;

  return (
    <div>
      {messages.map(({ message, user }, index) => (
        <div
          key={index}
          style={{ textAlign: user.id === currentUser.uid ? "left" : "start" }}
        >
          {message}
        </div>
      ))}
      <MessageInput roomRef={roomRef} />
    </div>
  );
};

export default Room;
