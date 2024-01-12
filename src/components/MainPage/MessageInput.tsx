import React, { useState } from "react";
import { addMessage } from "../../api/api";
import { User } from "../../types/type";
import { useSelector } from "react-redux";
import { DocumentReference, doc } from "@firebase/firestore";
import { firestore } from "../../firebase";

const MessageInput = ({ roomRef }: { roomRef: DocumentReference }) => {
  const [message, setMessage] = useState<string>("");
  const user = useSelector((state: any) => state.auth.user as User);

  if (!user || !user.uid) return <>No User</>;

  const userRef = doc(firestore, "User", user.uid);

  return (
    <>
      <input
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        placeholder="What you wanna say?"
      />
      <button
        type="button"
        onClick={(e) => {
          addMessage(roomRef, userRef, message);
        }}
        disabled={message === ""}
      >
        Send!
      </button>
    </>
  );
};

export default MessageInput;
