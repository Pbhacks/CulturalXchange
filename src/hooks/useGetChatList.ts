import { collection, doc, onSnapshot, query, where } from "@firebase/firestore";
import { firestore } from "../firebase";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Room, User } from "../types/type";

const useGetChatList = () => {
  const [chatList, setChatList] =
    useState<Array<Room & { roomId: string }>>(null);

  const user = useSelector((state: any) => state.auth.user as User);

  useEffect(() => {
    const q = query(
      collection(firestore, "Room"),
      where("users", "array-contains", doc(firestore, "User", user.uid))
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
      const rooms = [];
      querySnapshot.forEach((doc) => {
        rooms.push({ ...doc.data(), roomId: doc.id });
      });
      setChatList(rooms);
    });

    return () => {
      unsub();
    };
  }, []);

  return { chatList, setChatList };
};

export default useGetChatList;
