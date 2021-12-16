import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./fbInstance";

export const getProducts = async () => {
  const querySnapshot = await getDocs(query(collection(db, "products")));
  let products = [];
  querySnapshot.forEach((doc) => products.push(doc.data()));
  console.log(products);
  return products;
};
