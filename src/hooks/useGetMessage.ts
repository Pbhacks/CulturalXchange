import { useEffect, useState } from "react";
import { Message, Room } from "../types/type";
import { firestore } from "../firebase";
import { collection, doc, onSnapshot, query, where } from "@firebase/firestore";
import { getRoomSnapshot } from "../api/api";

const useGetMessage = ({ roomId }: { roomId: string }) => {
  const [room, setRoom] = useState<Room | "invalid">(null);
  const [messages, setMessages] = useState<Message[]>(null);

  const roomRef = doc(firestore, "Room", roomId);

  const getRoomData = async () => {
    const roomSnapshot = await getRoomSnapshot(roomId);
    // const chatListSnapshot = await getChatListSnapshot(chatListId);
    // const chatListRooms = chatListSnapshot.data().rooms as DocumentReference[];
    // if (chatListRooms.filter((x) => x.id === roomRef.id).length === 0) {
    //   setRoom("invalid");
    //   return;
    // }
    setRoom(roomSnapshot.data() as Room);
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

  return { room, messages };
};

export default useGetMessage;
