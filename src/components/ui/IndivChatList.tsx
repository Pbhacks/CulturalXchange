import React from "react";
import styled from "styled-components";

interface IndivChatListProps {
  profileImageSrc: string;
  username: string;
  latestChat: string;
}

const IndivChatList = ({
  profileImageSrc,
  username,
  latestChat,
}: IndivChatListProps) => {
  return (
    <Div20>
      <Img9 loading="lazy" srcSet={profileImageSrc} />
      <Div21>
        <Img10>{username}</Img10>
        <Img11>{latestChat}</Img11>
      </Div21>
    </Div20>
  );
};

export default IndivChatList;

const Div20 = styled.div`
  border-radius: 10px;
  background-color: var(--base-colour-1, rgba(84, 107, 232, 0.45));
  display: flex;
  margin-top: 27px;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 80px 18px 16px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
    padding-right: 20px;
  }
`;

const Img9 = styled.img`
  aspect-ratio: 0.89;
  object-fit: contain;
  object-position: center;
  width: 52px;
  overflow: hidden;
  max-width: 100%;
`;

const Div21 = styled.div`
  align-self: start;
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
`;

const Img10 = styled.p`
  aspect-ratio: 5;
  object-fit: contain;
  object-position: center;
  width: 70px;
  overflow: hidden;
  align-self: start;
  max-width: 100%;
`;

const Img11 = styled.p`
  aspect-ratio: 6.25;
  object-fit: contain;
  object-position: center;
  width: 93px;
  overflow: hidden;
  align-self: center;
  margin-top: 26px;
`;
