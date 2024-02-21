import styled from "styled-components";
import useGetChatList from "../../hooks/useGetChatList";
import { Dispatch, FC, SetStateAction, useState } from "react";
import IndivChatList from "./IndivChatList";
import React from "react";

interface UserListProps {
  contactName: string;
  setRoomId: Dispatch<SetStateAction<string>>;
  setContactName: Dispatch<SetStateAction<string>>;
}

const UserList: FC<UserListProps> = ({
  contactName,
  setRoomId,
  setContactName,
}) => {
  const { chatList } = useGetChatList();
  const [keyword, setKeyword] = useState<string>("");

  return (
    <ChatList>
      {chatList &&
        chatList.map(({ roomId }) => {
          return (
            <IndivChatList
              keyword={keyword}
              roomId={roomId}
              setRoomId={setRoomId}
              setConnectName={setContactName}
            />
          );
        })}
      <div>
        <input
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder="Find user with keyword"
          style={{
            background: "lightgray",
            width: "100%",
            border: "none",
            padding: "1rem",
          }}
        />
      </div>
    </ChatList>
  );
};

export default UserList;

const ChatList = styled.div`
  background-color: rgba(
    80.00000283122063,
    68.00000354647636,
    56.000000461936,
    0.44999998807907104
  );
  display: flex;
  padding-top: 10px;
  flex-direction: column;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
