import React, { useEffect, useState } from "react";
import { User } from "../../types/type";
import { DocumentReference, doc, getDoc } from "@firebase/firestore";
import { firestore } from "../../firebase";
import { useSelector } from "react-redux";

const RoomMemberName = ({ roomId }: { roomId: string }) => {
  const [userName, setUserName] = useState<string[]>([]);

  const user = useSelector((state: any) => state.auth.user as User);

  const getUserName = async () => {
    const roomRef = doc(firestore, "Room", roomId);
    const roomSnapshot = await getDoc(roomRef);

    if (roomSnapshot.exists()) {
      const userRef = roomSnapshot.data().users as DocumentReference[];

      userRef.forEach(async (ref) => {
        if (ref.id === user.uid) return;
        const userSnapshot = await getDoc(ref);
        if (userSnapshot.exists()) {
          setUserName((prev) => [...prev, userSnapshot.data().name]);
        }
      });
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <div>
      {userName.map((indivName) => {
        return <div key={indivName}>{indivName}</div>;
      })}
    </div>
  );
};

export default RoomMemberName;
