import React, { useContext } from "react";
import Layout, { siteTitlePrefix } from "../../components/layout";
import LoginPage from "../../components/LoginPage";
import UserContext from "../../contexts/userContext";
import SpinnerFullScreen from "../../components/SpinnerFullScreen";
import AdminDashboard from "../../components/AdminDashboard";
import Head from "next/head";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/fbInstance";

export default function Admin() {
  const { user, isLoading } = useContext(UserContext);
  // REFACTOR START

  // REFACTOR END

  // TODO: Refactor to server side render.
  const handlePageSelection = async () => {
    await getDoc(doc(db, "users", user.uid))
      .then(async (user) => {
        if (user.data().isAdmin === true) {
          return <AdminDashboard />;
        } else {
          return <LoginPage />;
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Admin Dashboard</title>
        <meta
          name="description"
          content="Access the administrative dashboard of SilverWind"
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      {isLoading ? <SpinnerFullScreen /> : handlePageSelection()}
    </Layout>
  );
}
