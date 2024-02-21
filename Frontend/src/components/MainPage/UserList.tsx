import React, { useEffect, useState } from "react";
import { User } from "../../types/type";
import { collection, onSnapshot, query } from "@firebase/firestore";
import { firestore } from "../../firebase";
import { useSelector } from "react-redux";
import PrivateChatRoomBtn from "./PrivateChatRoomBtn";

const UserList = () => {
  const [userList, setUserList] = useState<User[]>(null);
  const [keyword, setKeyword] = useState<string>();

  const user = useSelector((state: any) => state.auth.user as User);

  const searchedUserList =
    keyword.length === 0
      ? userList
      : userList.filter(({ name }) => name.includes(keyword));

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
      {searchedUserList.map(({ name, uid }) => {
        if (user.uid === uid) return <></>;

        return (
          <>
            <PrivateChatRoomBtn targetUserId={uid}>
              <div key={uid}>Chat with | {name}</div>
            </PrivateChatRoomBtn>
          </>
        );
      })}
      <div>
        <input
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder="find user with keyword"
          style={{ background: "black" }}
        />
      </div>
    </div>
  );
};

export default UserList;
