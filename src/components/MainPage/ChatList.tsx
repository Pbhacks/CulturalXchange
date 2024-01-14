import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Room, User } from "../../types/type";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import { firestore } from "../../firebase";
import { useSelector } from "react-redux";

const ChatList = () => {
  const [chatList, setChatList] = useState<Room[]>(null);

  const user = useSelector((state: any) => state.auth.user as User);

  useEffect(() => {
    const q = query(
      collection(firestore, "Room"),
      where("users", "array-contains", doc(firestore, "User", user.uid))
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
      const rooms = [];
      querySnapshot.forEach((doc) => {
        rooms.push(doc.data());
      });
      console.log(rooms);
      setChatList(rooms);
    });

    return () => {
      unsub();
    };
  }, []);

  if (!chatList) {
    return <div>Loading chatlist...</div>;
  }

  if (chatList.length === 0) {
    return <div>Start Chatting with your friend!</div>;
  }

  return (
    <div>
      chatlist
      <>
        {chatList.map((room) => {
          return <div>{String(room.createdAt)}</div>;
        })}
      </>
      <Outlet />
    </div>
  );
};

export default ChatList;
