import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/userContext";
import { auth, db } from "../lib/fbInstance";
import CenterTitle from "./CenterTitle";
import getUserData from "../lib/getUserData";
import ProfileLayout from "./ProfileLayout";
import axios from "axios";

export default function ProfilePage() {
  const { user } = useContext(UserContext);
  const [isAdmin, setisAdmin] = useState(false);
  const [userToken, setuserToken] = useState("");
  const [userSince, setuserSince] = useState("");
  const [userData, setuserData] = useState({});
  const router = useRouter();

  const fetchuserSince = async () => {
    console.log("stripeid", userData.stripeCustomerId);
    const { data: customer } = await axios.post("/api/stripe/get-customer", {
      id: userData.stripeCustomerId,
    });
    const date = new Date(customer.created * 1000);
    const year = date.getFullYear();
    setuserSince(`${year}`);
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

  const fetchuserData = async () => {
    await getUserData(user.uid)
      .then((data) => setuserData(data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    checkAdmin();
    fetchuserData();
  }, []);

  useEffect(() => {
    if (!userData.stripeCustomerId) return;
    fetchuserSince();
  }, [userData]);

  return (
    <React.Fragment>
      <ProfileLayout userData={userData}>
        <CenterTitle>Hello {userData.firstName}</CenterTitle>
        <div className="text-center text-violet-900 opacity-80">
          <p>Email: {user.email}</p>
          <p>
            Since{" "}
            <span className="font-semibold">
              {userSince !== "" ? userSince : "XXXX"}
            </span>
          </p>
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
        </div>
      </ProfileLayout>
    </React.Fragment>
  );
}
