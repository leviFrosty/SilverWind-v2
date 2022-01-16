import { doc, getDoc } from "@firebase/firestore";
import { db } from "./fbInstance";

export default async function getUserData(uid) {
  let data;
  let error;
  await getDoc(doc(db, "users", uid))
    .then((res) => (data = res.data()))
    .catch((e) => (error = e));
  if (error) return error;
  return data;
}
