import React, { useContext, useEffect, useState } from "react";
import Layout, { siteTitlePrefix } from "../../components/layout";
import LoginPage from "../../components/LoginPage";
import UserContext from "../../contexts/userContext";
import SpinnerFullScreen from "../../components/SpinnerFullScreen";
import AdminDashboard from "../../components/AdminDashboard";
import Head from "next/head";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/fbInstance";
import { getProducts } from "../../lib/getProducts";

export default function Admin({ products }) {
  const { user, isLoading } = useContext(UserContext);
  const [isAdmin, setisAdmin] = useState(false);
  const [isDataLoading, setisDataLoading] = useState(true);

  // TODO: Refactor to server side render.
  const handlePageSelection = () => {
    if (isAdmin) return <AdminDashboard products={products} />;
    return <LoginPage />;
  };

  useEffect(() => {
    const checkAdmin = async () => {
      await getDoc(doc(db, "users", user.uid))
        .then(async (user) => {
          if (user.data().isAdmin === true) {
            setisAdmin(true);
            setisDataLoading(false);
          }
        })
        .catch((e) => {
          setisDataLoading(false);
          console.log(e);
        });
    };
    if (user) checkAdmin();
  }, [user]);

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
      {isLoading || isDataLoading ? (
        <SpinnerFullScreen />
      ) : (
        handlePageSelection()
      )}
    </Layout>
  );
}
export async function getServerSideProps() {
  const products = await getProducts();
  return {
    props: { products }, // will be passed to the page component as props
  };
}
