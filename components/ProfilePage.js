import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import UserContext from "../contexts/userContext";
import { auth } from "../lib/fbInstance";
import CenterTitle from "./CenterTitle";

export default function ProfilePage() {
  const {user} = useContext(UserContext)
  const router = useRouter();

  const signOutUser = () => {
    signOut(auth);
    router.push("/login");
  };

  return (
    <React.Fragment>
      <CenterTitle>Profile</CenterTitle>
      <h2>Hello {user.email}</h2>
      <button onClick={() => signOutUser()}>Sign Out</button>
    </React.Fragment>
  );
}
