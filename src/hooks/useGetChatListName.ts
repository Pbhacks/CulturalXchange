import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../firebase";
import { DocumentReference, doc, getDoc } from "@firebase/firestore";
import { User } from "../types/type";

const useGetChatListName = ({ roomId }: { roomId: string }) => {
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

  return { chatListName: userName, setUserName };
};

export default useGetChatListName;
