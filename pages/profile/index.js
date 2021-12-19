import React, { useContext, useEffect } from "react";
import Layout from "/components/layout";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { siteTitlePrefix } from "../../components/layout";
import { auth } from "../../lib/fbInstance";
import Head from "next/head";
import UserContext from "../../contexts/userContext";
import CenterTitle from "../../components/CenterTitle";

const Profile = () => {
  const user = useContext(UserContext);
  const router = useRouter();
  
  useEffect(() => {
    if (!user) return router.push("/login");
  }, [])
  
  const signOutUser = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Profile</title>
      </Head>
      <CenterTitle>Profile</CenterTitle>
      <button onClick={() => signOutUser(router)}>Sign Out</button>
    </Layout>
  );
};

export default Profile;
