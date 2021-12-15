import Head from "next/head";
import BackToHome from "./backToHome";
import Footer from "./footer";
import Nav from "./nav";

export const siteTitlePrefix = "SilverWind -";

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Luxury handmade jewerly crafted by Julia."
        />
      </Head>
      <Nav />
      <main>{children}</main>
      {!home && <BackToHome />}
      <Footer />
    </div>
  );
}
