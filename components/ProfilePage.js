import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { auth, db } from "../lib/fbInstance";
import CenterTitle from "./CenterTitle";
import getUserData from "../lib/getUserData";
import ProfileLayout from "./ProfileLayout";
import axios from "axios";
import Container from "./Container";

export default function ProfilePage({ user }) {
  const [isAdmin, setisAdmin] = useState(false);
  const [userToken, setuserToken] = useState("");
  const [userSince, setuserSince] = useState("");
  const [userData, setuserData] = useState({});
  const router = useRouter();

  const fetchuserSince = async () => {
    console.log("stripeid", userData.stripeCustomerId);
    try {
      const { data: customer } = await axios.post("/api/stripe/get-customer", {
        id: userData.stripeCustomerId,
      });
      const date = new Date(customer.created * 1000);
      const year = date.getFullYear();
      setuserSince(`${year}`);
    } catch (err) {
      console.log(err);
    }
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
        <CenterTitle>
          {user.isAnonymous ? "Welcome guest!" : `Hello ${userData.firstName}`}
        </CenterTitle>
        <Container className="text-center text-violet-900 opacity-80">
          <div className={`flex flex-col ${user.isAnonymous ? "blur-sm" : ""}`}>
            <p>Email: {user.email}</p>
            <p>
              Since{" "}
              <span className="font-semibold">
                {userSince !== "" ? userSince : "XXXX"}
              </span>
            </p>
          </div>
          {user.isAnonymous ? (
            <div className="flex flex-col">
              <p className="text-red-600 font-semibold mt-2">
                You must sign up to view full profile details.
              </p>
              <button
                onClick={() =>
                  router.push({
                    pathname: "/signup",
                    query: { redirectTo: "/profile" },
                  })
                }
                className="rounded-md bg-violet-600 hover:bg-violet-700 cursor-pointer text-white text-lg w-full text-center py-2 my-3"
              >
                Complete your account
              </button>
            </div>
          ) : null}
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
      </ProfileLayout>
    </React.Fragment>
  );
}
