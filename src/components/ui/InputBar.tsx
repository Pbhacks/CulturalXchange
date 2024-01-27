import React from "react";
import styled from "styled-components";
import MessageInput from "../MainPage/MessageInput";
import { doc } from "@firebase/firestore";
import { firestore } from "../../firebase";

const InputBar = ({ currentRoomId }: { currentRoomId: string }) => {
  return (
    <Div37>
      <Img29
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d6f11c2734634bcec9e726a76a144ca9eadcb2e27d6955ced95479771c36617?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&"
      />
      <Img30
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/db13e62c511458e6cf6da0215162047f186f1280b33eb6031ba7da7fd6f6b8d8?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&"
      />
      {currentRoomId && (
        <MessageInput roomRef={doc(firestore, "Room", currentRoomId)} />
      )}
    </Div37>
  );
};

export default InputBar;

const Div37 = styled.div`
  background-color: var(--base-colour-1, rgba(84, 107, 232, 0.45));
  display: flex;
  width: 100%;
  align-items: center;
  gap: 15px;
  padding: 17px 45px 10px 31px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
    padding: 0 20px;
  }
`;

const Img29 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 30px;
  overflow: hidden;
  margin-top: 5px;
  max-width: 100%;
`;

const Img30 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 30px;
  overflow: hidden;
  margin-top: 5px;
  max-width: 100%;
`;
