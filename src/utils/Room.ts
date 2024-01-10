import { addDoc, collection, doc, getDoc, setDoc } from "@firebase/firestore";
import { firestore } from "../firebase";
import { User } from "../types/type";

export default class Room {
  public _id;
  private _firestore;

  constructor(id: string) {
    this._id = id;
  }

  async getRoom() {
    const docRef = doc(this._firestore, "Room", this._id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  }

  async createRoom(users: User[]) {
    const date = new Date().getUTCDate();
    try {
      await addDoc(collection(firestore, "Room"), {
        users,
        createdAt: date,
        updatedAt: date,
      });
    } catch (err) {
      console.error(err);
    } finally {
      console.log("New Room Successfully added");
    }
  }

  // make subscribe connection to the room. if you call unsub(), then it will be unsubscirbed.
  async addMember(user: User) {
    const existingUser = (
      await getDoc(doc(this._firestore, "Room", this._id))
    ).data().users;

    try {
      await setDoc(doc(this._firestore, "Room", this._id), {
        users: [...existingUser, user],
      });
    } catch (err) {
      console.error(err);
    } finally {
      console.log("New member Successfully added");
    }
  }

  async removeMember(user: User) {
    const existingUser = (
      await getDoc(doc(this._firestore, "Room", this._id))
    ).data().users as User[];

    try {
      await setDoc(doc(this._firestore, "Room", this._id), {
        users: existingUser.filter((x) => x !== user),
      });
    } catch (err) {
      console.error(err);
    } finally {
      console.log("Member Successfully removed");
    }
  }
}
