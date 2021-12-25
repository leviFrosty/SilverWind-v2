import React, { useContext, useEffect } from "react";
import Layout from "/components/layout";
import { siteTitlePrefix } from "../../components/layout";
import Head from "next/head";
import UserContext from "../../contexts/userContext";
import ProfilePage from "../../components/ProfilePage";
import LoginPage from "../../components/LoginPage";
import SpinnerFullScreen from "../../components/SpinnerFullScreen";
import { useRouter } from "next/router";

const Profile = () => {
  const { user, isLoading } = useContext(UserContext);
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Profile</title>
      </Head>
      {isLoading ? <SpinnerFullScreen /> : null}
      {user ? <ProfilePage /> : <LoginPage redirectTo={router.pathname} />}
    </Layout>
  );
};

export default Profile;
