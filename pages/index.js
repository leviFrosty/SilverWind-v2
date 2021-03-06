import Head from "next/head";
import Hero from "../components/hero";
import OrderCustom from "../components/OrderCustom";
import Layout, { siteTitlePrefix } from "../components/layout";

const coverPhotoUrl =
  "https://firebasestorage.googleapis.com/v0/b/silverwind-ca60d.appspot.com/o/assets%2FcarvedRingPhoto-min.jpeg?alt=media&token=57bc831b-9e2d-472f-a61e-579aee86b907";
const coverVideoUrl =
  "https://firebasestorage.googleapis.com/v0/b/silverwind-ca60d.appspot.com/o/assets%2FcarvedRingVideo.mp4?alt=media&token=dc2242ed-b0f8-496f-86b6-53a083aeb555";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitlePrefix} Custom Handmade Jewelry</title>
        <meta
          name="description"
          content="SilverWind is offering the best in custom handcrafted jewelry and bespoke pieces. Our goal is to deliver a quality and unique experience that will leave you feeling special with something special."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.silverwind.store/" />
        <meta
          property="og:title"
          content="SilverWind - Custom Handmade Jewelry"
        />
        <meta
          property="og:description"
          content="SilverWind is offering the best in custom handcrafted Jewelry and bespoke pieces. Our goal is to deliver a quality and unique experience that will leave you feeling special with something special."
        />
        <meta property="og:image" content={coverPhotoUrl} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.silverwind.store/" />
        <meta
          property="twitter:title"
          content="SilverWind - Custom Handmade Jewelry"
        />
        <meta
          property="twitter:description"
          content="SilverWind is offering the best in custom handcrafted Jewelry and bespoke pieces. Our goal is to deliver a quality and unique experience that will leave you feeling special with something special."
        />
        <meta property="twitter:image" content={coverPhotoUrl} />
      </Head>
      <section>
        <Hero coverPhotoUrl={coverPhotoUrl} coverVideoUrl={coverVideoUrl} />
      </section>
      <section>
        <OrderCustom />
      </section>
    </Layout>
  );
}
