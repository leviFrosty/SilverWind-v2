import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./fbInstance";

export const getProducts = async () => {
  const querySnapshot = await getDocs(
    query(collection(db, "products"), where("active", "==", true))
  );
  let products = [];
  querySnapshot.forEach((doc) => products.push(doc.data()));
  return products;
};
