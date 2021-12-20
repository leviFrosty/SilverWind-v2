import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { auth } from "../lib/fbInstance";
import CenterTitle from "./CenterTitle";

export default function ProfilePage() {
  const router = useRouter();

  const signOutUser = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <>
      <CenterTitle>Profile</CenterTitle>
      <button onClick={() => signOutUser()}>Sign Out</button>
    </>
  );
}
