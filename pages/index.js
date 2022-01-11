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

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.silverwind.store/products/rings"
        />
        <meta property="og:title" content="SilverWind - Rings" />
        <meta
          property="og:description"
          content="SilverWind is offering the best in custom handcrafted Jewelry and bespoke pieces. Our goal is to deliver a quality and unique experience that will leave you feeling special with something special."
        />
        <meta property="og:image" content="" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://www.silverwind.store/products/rings"
        />
        <meta property="twitter:title" content="SilverWind - Rings" />
        <meta
          property="twitter:description"
          content="SilverWind is offering the best in custom handcrafted Jewelry and bespoke pieces. Our goal is to deliver a quality and unique experience that will leave you feeling special with something special."
        />
        <meta property="twitter:image" content="" />
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
