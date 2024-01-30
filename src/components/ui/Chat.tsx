import React from "react";
import useGetMessage from "../../hooks/useGetMessage";
import { User } from "../../types/type";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Chat = ({ roomId }: { roomId: string }) => {
  const { messages } = useGetMessage({ roomId });
  const currentUser = useSelector((state: any) => state.auth.user as User);

  if (!messages) {
    <div>Waiting...</div>;
  }

  return (
    <MessageWrapper>
      {messages &&
        messages.map(({ message, user }, index) => {
          return (
            <>
              <div
                key={index}
                style={{
                  alignSelf: user.id === currentUser.uid ? "start" : "end",
                  // color: user.id === currentUser.uid ? "white" : "red",
                }}
              >
                {message}
              </div>
            </>
          );
        })}
    </MessageWrapper>
  );
};

export default Chat;

const MessageWrapper = styled.div`
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
`;
