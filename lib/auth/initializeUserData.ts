import { doc, setDoc } from "firebase/firestore";
import { db } from "../fbInstance";

const initializeUserData = async (
  uid: string,
  firstName?: string,
  lastName?: string,
  gender?: string,
  email?: string,
  stripeCustomerId?: string
) => {
  // Adds user document for extra user data in Firebase.
  const docData = {
    firstName: firstName || "",
    lastName: lastName || "",
    gender: gender || "",
    email: email || "",
    cart: [],
    likes: [],
    purchases: [],
    isAdmin: false,
    stripeCustomerId: stripeCustomerId || "",
  };
  await setDoc(doc(db, "users", uid), docData).catch((e) => {
    console.log(e);
  });
};

export default initializeUserData;
