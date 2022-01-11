import Head from "next/head";
import Hero from "../components/hero";
import OrderCustom from "../components/OrderCustom";
import Layout, { siteTitlePrefix } from "../components/layout";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitlePrefix} Custom Handmade Jewelry</title>
        <meta
          name="description"
          content="SilverWind is offering the best in custom handcrafted Jewelry and bespoke pieces. Our goal is to deliver a quality and unique experience that will leave you feeling special with something special."
        />
      </Head>
      <section>
        <Hero />
      </section>
      <section>
        <OrderCustom />
      </section>
    </Layout>
  );
}
