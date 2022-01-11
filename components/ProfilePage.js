import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/userContext";
import { auth, db } from "../lib/fbInstance";
import CenterTitle from "./CenterTitle";
import Container from "./Container";
import getUserData from "../lib/getUserData";
import ProfileLayout from "./ProfileLayout";

export default function ProfilePage() {
  const { user } = useContext(UserContext);
  const [isAdmin, setisAdmin] = useState(false);
  const [userToken, setuserToken] = useState("");
  const [userData, setuserData] = useState({});
  const router = useRouter();



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

  const fetchuserData = async () => {
    await getUserData(user.uid)
      .then((data) => setuserData(data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    checkAdmin();
    fetchuserData();
  }, []);

  return (
    <React.Fragment>
      <ProfileLayout userData={userData}>
        <CenterTitle>Hello {userData.firstName}</CenterTitle>
        <p className="text-center">Email: {user.email}</p>
        
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
      </ProfileLayout>
    </React.Fragment>
  );
}
