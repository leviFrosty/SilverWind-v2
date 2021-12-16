import React, { useContext, useEffect } from "react";
import Layout from "/components/layout";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { siteTitlePrefix } from "../../components/layout";
import { auth } from "../../lib/fbInstance";
import Head from "next/head";
import UserContext from "../../contexts/userContext";

// export async function getServerSideProps() {
//   const auth = getAuth(app);
//   console.log(auth.currentUser);
//   // Pass data to the page via props
//   return { props: { test: "" } };
// }

const Profile = () => {
  const user = useContext(UserContext);

  const router = useRouter();
  const signOutUser = () => {
    signOut(auth);
    router.push("/");
  };

  useEffect(() => {
    console.log("PROFILE PAGE", user);
  }, []);

  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Profile</title>
      </Head>
      <h1>Profile Page</h1>
      <button onClick={() => signOutUser(router)}>Sign Out</button>
    </Layout>
  );
};

export default Profile;
