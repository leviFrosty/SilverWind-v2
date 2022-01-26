import { doc, setDoc } from "firebase/firestore";
import { db } from "./fbInstance";
import getUserData from "./getUserData";

export default async function removeFromCart(userId, cartEntryId) {
  const ref = doc(db, "users", userId);
  const { cart: currentCart } = await getUserData(userId);
  const newCart = currentCart.filter((entry) => {
    return entry.cartEntryId !== cartEntryId;
  });
  setDoc(ref, { cart: newCart }, { merge: true });
}
