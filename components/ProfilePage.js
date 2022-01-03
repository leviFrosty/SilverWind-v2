import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/userContext";
import { auth, db } from "../lib/fbInstance";
import CenterTitle from "./CenterTitle";
import Container from "./Container";

export default function ProfilePage() {
  const { user } = useContext(UserContext);
  const [isAdmin, setisAdmin] = useState(false);
  const [userToken, setuserToken] = useState("");
  const router = useRouter();

  const signOutUser = () => {
    signOut(auth);
    router.push("/login");
  };

  const checkAdmin = async () => {
    await getDoc(doc(db, "users", user.uid))
      .then(async (user) => {
        if (user.data().isAdmin === true) {
          setisAdmin(true);
          await auth.currentUser
            .getIdToken(true)
            .then((token) => setuserToken(token));
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    checkAdmin();
  }, []);

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
        {isAdmin && (
          <button
            className="underline decoration-2 rounded-md px-8 py-2 text-violet-900"
            onClick={() =>
              router.push({ pathname: "/admin", query: { token: userToken } })
            }
          >
            Admin Dashboard
          </button>
        )}
      </Container>
    </React.Fragment>
  );
}
