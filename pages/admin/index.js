import React, { useContext, useEffect, useState } from "react";
import Layout, { siteTitlePrefix } from "../../components/layout";
import LoginPage from "../../components/LoginPage";
import UserContext from "../../contexts/userContext";
import SpinnerFullScreen from "../../components/SpinnerFullScreen";
import AdminDashboard from "../../components/AdminDashboard";
import Head from "next/head";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../lib/fbInstance";
import { getProducts } from "../../lib/getProducts";

export default function Admin() {
  const { user, isLoading } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [isAdmin, setisAdmin] = useState(false);
  const [isDataLoading, setisDataLoading] = useState(true);

  // TODO: Refactor to server side render.
  const handlePageSelection = () => {
    if (isAdmin) return <AdminDashboard products={products} />;
    return <LoginPage />;
  };

  useEffect(() => {
    const getProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      let fetchedProducts = [];
      querySnapshot.forEach((doc) => fetchedProducts.push(doc.data()));
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []);

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
