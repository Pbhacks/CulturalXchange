import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "../../types/type";
import { collection, doc, getDocs, query, where } from "@firebase/firestore";
import { firestore } from "../../firebase";
import { Link } from "react-router-dom";
import { addRoomToChatList, createRoom } from "../../api/api";

const PrivateChatRoomBtn = ({ targetUserId }: { targetUserId: string }) => {
  const [roomId, setRoomId] = useState<string>(null);

  const user = useSelector((state: any) => state.auth.user as User);

  const getRoomData = async (targetUserId: string) => {
    const q = query(
      collection(firestore, "Room"),
      where("users", "array-contains", doc(firestore, "User", user.uid))
    );

    const res = await getDocs(q);

    console.log(res);

    if (res.size <= 0) {
      const users = [
        doc(firestore, "User", user.uid),
        doc(firestore, "User", targetUserId),
      ];
      // if user, targetUser private room does not exist
      const roomRef = await createRoom(users);
      await addRoomToChatList(users, roomRef);
      setRoomId(roomRef.id);
    } else {
      res.forEach((document) => {
        console.log(document.data().users.includes());
        if (
          document.data().users.length === 2 &&
          document.data().users.some((ref) => ref.id === targetUserId)
        ) {
          console.log("the doc is:", document.data());
          setRoomId(document.id);
        }
      });
    }
  };

  useEffect(() => {
    getRoomData(targetUserId);
  }, []);

  if (!roomId) return <></>;

  return <Link to={`/chat/${user.uid}/${roomId}`}>Click!!!!!!</Link>;
};

export default PrivateChatRoomBtn;
