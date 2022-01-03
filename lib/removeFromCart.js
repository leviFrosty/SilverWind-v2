import { doc, setDoc } from "firebase/firestore";
import { db } from "./fbInstance";
import getUserData from "./getUserData";

export default async (userId, productId) => {
  const ref = doc(db, "users", userId);
  const { cart: currentCart } = await getUserData(userId);
  const newCart = currentCart.filter((product) => product.id !== productId);
  console.log(newCart);
  setDoc(ref, { cart: newCart }, { merge: true });
};
