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
  let productQuantity;
  const productDoc = await getDoc(doc(db, "products", productId));
  productQuantity = await productDoc.data().quantity;
  const ref = await doc(db, "users", userId);
  const cart = await (await getDoc(ref)).data().cart;
  const found = cart.find(
    (product) => product.id == productId && _.isEqual(product.options, options)
  );
  const allFound = cart.filter((product) => product.id == productId);
  let allFoundTotal = 0;
  if (allFound) {
    allFound.forEach((cartEntry) => {
      allFoundTotal = allFoundTotal + cartEntry.quantity;
    });
  }
  // Handles adding too many to cart by checking if found exactly, found at all, or not found
  if (found && allFoundTotal + changeByquantity > productQuantity) {
    throw new Error("Quantity exceeds available stock");
  }
  if (allFound) {
    if (allFoundTotal + changeByquantity > productQuantity) {
      throw new Error("Quantity exceeds available stock");
    }
  }
  if (changeByquantity > productQuantity) {
    throw new Error("Quantity exceeds available stock");
  }
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
  return productToAdd.quantity;
};
