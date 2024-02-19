import React, { useState } from "react";
import useGetMessage from "../../hooks/useGetMessage";
import { User } from "../../types/type";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { firestore } from "../../firebase";
import { doc } from "@firebase/firestore";
import { removeMessage } from "../../api/api";

const Chat = ({ roomId }: { roomId: string }) => {
  const { messages } = useGetMessage({ roomId });
  const currentUser = useSelector((state: any) => state.auth.user as User);
  const [keyword, setKeyword] = useState<string>("");

  if (!messages) {
    <div>Waiting...</div>;
  }

  return (
    <MessageWrapper>
      {messages &&
        messages.map(({ mid, message, user }, index) => {
          const isUsersMessage = user.id === currentUser.uid;
          return (
            <>
              <div
                key={index}
                style={{
                  alignSelf: isUsersMessage ? "start" : "end",
                  color:
                    !message.includes(keyword) || keyword === ""
                      ? "white"
                      : "yellow",
                }}
                onClick={async () => {
                  if (!isUsersMessage) return;
                  await removeMessage(doc(firestore, "Message", mid));
                }}
              >
                {message}
              </div>
            </>
          );
        })}
      <section>
        <input
          placeholder="Search message with keyword"
          alt="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </section>
    </MessageWrapper>
  );
};

export default Chat;

const MessageWrapper = styled.div`
  position: relative;
  margin-top: 16px;
  margin-right: 8px;
  display: flex;
  gap: 8px;
  width: 100%;
  flex-direction: column;
  div {
    width: 100px;
    padding: 16px;
    background: gray;
    border-radius: 8px;
    color: white;
  }
  section {
    width: calc(100% - 32px);
    position: absolute;
    bottom: 0;
    left: 0;
    background: gray;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
    height: 48px;
    padding-left: 16px;
    padding-right: 16px;
    input {
      width: 100%;
      background: none;
      border: none;
      color: white;
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: white;
      }
    }
  }
`;
