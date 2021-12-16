import Head from "next/head";
import BackToHome from "./backToHome";
import Footer from "./footer";
import Nav from "./nav";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { auth } from "../lib/fbInstance";

export const siteTitlePrefix = "SilverWind -";

export default function Layout({ home, children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
    });
  }, []);

  return (
    <div>
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
    </div>
  );
}
