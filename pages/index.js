import Head from "next/head";
import Hero from "../components/hero";
import OrderCustom from "../components/OrderCustom";
import Layout, { siteTitlePrefix } from "../components/layout";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitlePrefix} Custom Handmade Jewelry</title>
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
