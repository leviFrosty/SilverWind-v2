import { signOut } from "firebase/auth";
import { auth } from "./fbInstance";

export const signOutUser = (router) => {
  signOut(auth);
  router.push("/");
};
