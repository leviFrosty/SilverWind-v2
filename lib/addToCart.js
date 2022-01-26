import { doc, getDoc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { db } from "./fbInstance";
import _ from "lodash";

export const addToCart = async (
  userId,
  productId,
  changeByquantity,
  setAddedToCart,
  options
) => {
  let productToAdd = {};
  let cartArray = [];
  try {
    const ref = await doc(db, "users", userId);
    const cart = await (await getDoc(ref)).data().cart;
    const found = cart.find(
      (product) =>
        product.id == productId && _.isEqual(product.options, options)
    );
    // Formats cart array
    if (found) {
      productToAdd = {
        cartEntryId: found.cartEntryId,
        id: found.id,
        quantity: found.quantity + changeByquantity,
        options: found.options,
      };
      const filteredCart = cart.filter((item) => {
        return !(item.id == productId && _.isEqual(item.options, options));
      });
      cartArray = [productToAdd, ...filteredCart];
    } else {
      productToAdd = {
        cartEntryId: uuidv4(),
        id: productId,
        quantity: changeByquantity,
        options: options || {},
      };
      cartArray = [productToAdd, ...cart];
    }
    await setDoc(
      ref,
      {
        cart: cartArray.sort(
          (a, b) => parseInt(a.cartEntryId, 16) - parseInt(b.cartEntryId, 16)
        ),
      },
      { merge: true }
    ).catch((e) => console.log(e));
  } catch (err) {
    console.log(err.message);
  }
  if (typeof setAddedToCart == "function") {
    setAddedToCart(true);
  }
  return productToAdd.quantity;
};
