import Head from "next/head";
import Hero from "../components/hero";
import OrderCustom from "../components/OrderCustom";
import Layout, { siteTitlePrefix } from "../components/layout";
import ContactPage from "../components/ContactPage";
import { getDownloadURL, list, ref } from "firebase/storage";
import { storage } from "../lib/fbInstance";

const coverPhotoUrl =
  "https://firebasestorage.googleapis.com/v0/b/silverwind-ca60d.appspot.com/o/assets%2FcarvedRingPhoto-min.jpeg?alt=media&token=57bc831b-9e2d-472f-a61e-579aee86b907";
const pageName = "Contact Us";
const pageDescription =
  "Learn how to contact SilverWind for questions, returns, or custom orders.";
const pageFullTitle = `${siteTitlePrefix} ${pageName}`;
const pageUrl = "https://www.silverwind.store/contact";

export default function Contact({ PORTRAIT_PHOTO_URL }) {
  return (
    <Layout>
      <Head>
        <title>{pageFullTitle}</title>
        <meta name="description" content={pageDescription} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageFullTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={coverPhotoUrl} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={pageUrl} />
        <meta property="twitter:title" content={pageFullTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={coverPhotoUrl} />
      </Head>
      <section>
        <ContactPage PORTRAIT_PHOTO_URL={PORTRAIT_PHOTO_URL} />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const listRef = await ref(storage, "assets/about_page");
  const imageRef = await list(listRef, { maxResults: 1 });
  const portraitUrl = await getDownloadURL(imageRef.items[0]);
  return {
    props: { PORTRAIT_PHOTO_URL: portraitUrl },
  };
}
