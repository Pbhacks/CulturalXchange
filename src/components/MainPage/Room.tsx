import React, { useEffect, useState } from "react";
import {
  getChatListSnapshot,
  getMessageSnapshot,
  getRoomSnapshot,
} from "../../api/api";
import { useParams } from "react-router-dom";
import { Message, Room as RoomType } from "../../types/type";
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

const Room = () => {
  const { chatListId, roomId } = useParams();
  const [room, setRoom] = useState<RoomType | "invalid">(null);
  const [messages, setMessages] = useState<Message[]>(null);

  const roomRef = doc(firestore, "Room", roomId);

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

  // const getMessageData = async () => {
  //   const messageSnapshot = await getMessageSnapshot(roomId);
  //   setMessages(messageSnapshot.docs as unknown as Message[]);
  // };

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
        console.log("Current data: ", doc.data());
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

  useEffect(() => {}, []);

  if (room === "invalid") return <>INVALID ROOM!!!</>;

  if (!room || !messages) return <>Loading...</>;

  return (
    <div>
      {messages.map(({ message }, index) => (
        <div key={index}>{message}</div>
      ))}
      <MessageInput roomRef={roomRef} />
    </div>
  );
};

export default Room;
