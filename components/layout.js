import Head from "next/head";
import BackToHome from "./backToHome";
import Footer from "./footer";
import Nav from "./nav";
import React, { useContext } from "react";
import UserContext from "../contexts/userContext";

export const siteTitlePrefix = "SilverWind -";

export default function Layout({ home, children }) {
  const user = useContext(UserContext);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Luxury handmade jewerly crafted by Julia."
        />
      </Head>
      <Nav user={user} />
      <main>{children}</main>
      {!home && <BackToHome />}
      <Footer />
    </>
  );
}
