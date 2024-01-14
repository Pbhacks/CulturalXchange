import React, { useEffect, useState } from "react";
import { User } from "../../types/type";
import { collection, onSnapshot, query } from "@firebase/firestore";
import { firestore } from "../../firebase";
import { useSelector } from "react-redux";
import PrivateChatRoomBtn from "./PrivateChatRoomBtn";

const UserList = () => {
  const [userList, setUserList] = useState<User[]>(null);

  const user = useSelector((state: any) => state.auth.user as User);

  useEffect(() => {
    const q = query(collection(firestore, "User"));

    const unsub = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUserList(users);
    });

    return () => {
      unsub();
    };
  }, []);

  if (!userList) {
    return <div>Failed Fetching User Data</div>;
  }

  return (
    <div>
      {userList.map(({ name, uid }) => {
        if (user.uid === uid) return <></>;

        return (
          <>
            <div key={uid}>{name}</div>
            <PrivateChatRoomBtn targetUserId={uid} />
          </>
        );
      })}
    </div>
  );
};

export default UserList;
