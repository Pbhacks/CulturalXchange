// createRoom

import {
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "@firebase/firestore";
import { firestore } from "../firebase";

export const createRoom = async (users: DocumentReference[]) => {
  const date = new Date().getUTCDate();
  try {
    const roomRef = await addDoc(collection(firestore, "Room"), {
      users,
      createdAt: date,
      updatedAt: date,
    });
    return roomRef;
  } catch (err) {
    console.error(err);
  }
};

export const getRoomSnapshot = async (roomId: string) => {
  try {
    const roomSnapshot = await getDoc(doc(firestore, "Room", roomId));
    if (roomSnapshot.exists()) {
      return roomSnapshot;
    } else {
      console.log("Room does not exist");
    }
  } catch (err) {
    console.error(err);
  }
};

// addMemberToRoom
export const addMemberToRoom = async (
  userRef: DocumentReference,
  roomRef: DocumentReference
) => {
  const existingUser = (await getDoc(roomRef)).data()
    .users as DocumentReference[];

  try {
    await setDoc(roomRef, {
      users: [...existingUser, userRef],
    });
  } catch (err) {
    console.error(err);
  }
};

// removeMemberAtRoom
export const removeMemberAtRoom = async (
  userRef: DocumentReference,
  roomRef: DocumentReference
) => {
  const existingUser = (await getDoc(roomRef)).data()
    .users as DocumentReference[];

  try {
    await setDoc(roomRef, {
      users: existingUser.filter((x) => x !== userRef),
    });
  } catch (err) {
    console.error(err);
  }
};

// removeRoom

// getMessage
export const getMessageSnapshot = async (roomId: string) => {
  const roomRef = doc(firestore, "Room", roomId);
  const messageSnapshotQuery = query(
    collection(firestore, "Message"),
    where("room", "==", roomRef)
  );
  const messageSnapshot = await getDocs(messageSnapshotQuery);
  return messageSnapshot;
};

// addMessageo
export const addMessage = async (
  roomRef: DocumentReference,
  userRef: DocumentReference,
  message: string
) => {
  const date = new Date().getUTCDate();
  try {
    await addDoc(collection(firestore, "Message"), {
      user: userRef,
      room: roomRef,
      message: message,
      createdAt: date,
      updatedAt: date,
    });
  } catch (err) {
    console.error(err);
  }
};

// removeMessage
export const removeMessage = async (messageRef: DocumentReference) => {
  try {
    await deleteDoc(doc(firestore, "Message", messageRef.id));
  } catch (err) {
    console.error(err);
  }
};

// getChatList
export const getChatListSnapshot = async (chatListId: string) => {
  try {
    const chatListSnapshot = await getDoc(
      doc(firestore, "ChatList", chatListId)
    );
    if (chatListSnapshot.exists()) {
      return chatListSnapshot;
    } else {
      console.log("ChatList does not exist");
    }
  } catch (err) {
    console.error(err);
  }
};

// addChatList

// addRoomToChatList
export const addRoomToChatList = async (
  users: DocumentReference[],
  roomRef: DocumentReference
) => {
  try {
    users.forEach(async (userRef) => {
      const chatList = await getDoc(doc(firestore, "ChatList", userRef.id));
      if (chatList.exists()) {
        await setDoc(
          doc(firestore, "ChatList", userRef.id),
          {
            rooms: [...chatList.data().rooms, roomRef],
          },
          { merge: true }
        );
      }
    });
  } catch (err) {
    console.error(err);
  }
};

// removeChatList
