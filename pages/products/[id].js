import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useRouter } from "next/router";
import Layout, { siteTitlePrefix } from "../../components/layout";
import PageTitle from "../../components/PageTitle";
import { db } from "../../lib/fbInstance";
import SpinnerFullScreen from "../../components/SpinnerFullScreen";
import ImageSelector from "../../components/ImageSelector";
import ProductInfo from "../../components/ProductInfo";
import Container from "../../components/Container";
import Head from "next/head";

export default function ProductDetails({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Head>
        <title>{`${siteTitlePrefix} ${product.name}`}</title>
        {/* Primary Meta */}
        <meta name="description" content={product.description} />

        {/* Open Graph / Facebook*/}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${siteTitlePrefix} ${product.name}`}
        />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.coverPhotoURL} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content={`${siteTitlePrefix} ${product.name}`}
        />
        <meta property="twitter:description" content={product.description} />
        <meta property="twitter:image" content={product.coverPhotoURL} />
      </Head>
      <Layout>
        {router.isFallback ? (
          <SpinnerFullScreen />
        ) : (
          <Container>
            <PageTitle>{product.name}</PageTitle>
            <div className="flex flex-col gap-2 md:gap-8 md:flex-row justify-center">
              <ImageSelector product={product} />
              <ProductInfo product={product} />
            </div>
          </Container>
        )}
      </Layout>
    </React.Fragment>
  );
}

export async function getStaticPaths() {
  const q = query(collection(db, "products"), where("active", "==", true));
  const querySnapshot = await getDocs(q);
  let docIds = [];
  await querySnapshot.forEach((doc) => docIds.push(doc.id));
  const paths = docIds.map((id) => ({
    params: { id },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  const {
    params: { id },
  } = context;
  const docRef = await doc(db, "products", id);
  let product = {};
  await getDoc(docRef)
    .then((doc) => {
      product = doc.data();
    })
    .catch((e) => console.log(e));
  return {
    props: { product },
    revalidate: 10,
  };
}
