import { getDoc, doc } from "firebase/firestore";
import { db } from './fbInstance';

export default async function getProduct(id) {
  const docRef = doc(db, 'products', id)
  return await getDoc(docRef)
}