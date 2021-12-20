import React, { useContext, useEffect } from "react";
import Layout from "/components/layout";
import { siteTitlePrefix } from "../../components/layout";
import Head from "next/head";
import UserContext from "../../contexts/userContext";
import ProfilePage from "../../components/ProfilePage";
import LoginPage from "../../components/LoginPage";
import SpinnerFullScreen from "../../components/SpinnerFullScreen";

const Profile = () => {
  const { user, isLoading } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, []);


  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Profile</title>
      </Head>
      {isLoading ? <SpinnerFullScreen /> : null}
      {user ? <ProfilePage /> : <LoginPage />}
    </Layout>
  );
};

export default Profile;
