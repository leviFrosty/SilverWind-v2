import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import UserContext from "../contexts/userContext";
import { auth } from "../lib/fbInstance";
import CenterTitle from "./CenterTitle";
import Container from "./Container";

export default function ProfilePage() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const signOutUser = () => {
    signOut(auth);
    router.push("/login");
  };

  return (
    <React.Fragment>
      <CenterTitle>Profile</CenterTitle>
      <Container>
        <h2 className="text-center">Hello {user.email}</h2>
        <button
          className="underline decoration-2 rounded-md px-8 py-2 text-violet-900"
          onClick={() => signOutUser()}
        >
          Sign Out
        </button>
      </Container>
    </React.Fragment>
  );
}
