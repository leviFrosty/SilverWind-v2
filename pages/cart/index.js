import { useContext } from "react";
import Layout, { siteTitlePrefix } from "../../components/layout";
import UserContext from "../../contexts/userContext";
import LoginPage from "../../components/LoginPage";
import CartPage from "../../components/CartPage";
import SpinnerFullScreen from "../../components/SpinnerFullScreen";
import Head from "next/head";

export default function Cart() {
  const { user, isLoading } = useContext(UserContext);

  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Cart</title>
        <meta
          name="description"
          content="View your SilverWind shopping cart."
        />
        <meta name="robots" content="noindex, follow" />
      </Head>
      {isLoading ? <SpinnerFullScreen /> : null}
      {user ? <CartPage user={user} /> : <LoginPage />}
    </Layout>
  );
}
