import Head from "next/head";
import BackToHome from "./backToHome";
import Footer from "./footer";
import Nav from "./nav";
import React from "react";

export const siteTitlePrefix = "SilverWind -";

export default function Layout({ home, children }) {
  return (
    <React.Fragment>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Luxury handmade jewerly crafted by Julia."
        />
      </Head>
      <Nav />
      <main className="min-h-[75vh]">{children}</main>
      {!home && <BackToHome />}
      <Footer />
    </React.Fragment>
  );
}
