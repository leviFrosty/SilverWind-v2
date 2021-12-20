import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./fbInstance";

export const addToCart = async (
  userId,
  productId,
  changeByquantity,
  setAddedToCart
) => {
  let productToAdd = {};
  let cartArray = [];
  try {
    const ref = await doc(db, "users", userId);
    const { cart } = await (await getDoc(ref)).data();
    const found = cart.find((product) => product.id == productId);

    // Formats cart array
    if (found) {
      productToAdd = {
        id: found.id,
        quantity: found.quantity + changeByquantity,
      };
      const filteredCart = cart.filter((item) => item.id !== productId);
      cartArray = [productToAdd, ...filteredCart];
    } else {
      productToAdd = {
        id: productId,
        changeByquantity,
      };
      cartArray = [productToAdd, ...cart];
    }

    await setDoc(ref, { cart: cartArray }, { merge: true }).catch((e) =>
      console.log(e)
    );
  } catch {
    throw Error(
      "User cart not found. Validate user is signed in or cart key is not missing from database."
    );
  }
  if (setAddedToCart) {
    setAddedToCart(true);
  }
  return productToAdd.quantity;
};
