import { doc, onSnapshot } from "@firebase/firestore";
import { db } from "./fbInstance";

export const getUserData = async (uid) => {
  const docRef = doc(db, "users", uid);
  let data = {};
  await onSnapshot(docRef, (doc) => {
    data = setuserData(doc.data());
  });
  return data;
};
