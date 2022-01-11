import Head from "next/head";
import React from "react";
import Layout, { siteTitlePrefix } from "../../components/layout";
import PageTitle from "../../components/PageTitle";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../lib/fbInstance";
import { RINGS } from "../../lib/PRODUCT_KEYS";

export async function getStaticProps() {
  let products = [];
  const querySnapshot = await getDocs(
    query(collection(db, "products"), where("category", "==", RINGS))
  );
  await querySnapshot.forEach((doc) => products.push(doc.data()));

  return {
    props: {
      products: products,
    },
    revalidate: 10,
  };
}

export default function Rings({ products }) {
  console.log(products);
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Handmade Rings</title>
        <meta
          name="description"
          content="Handcrafted and unique quality rings made specially with love."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <PageTitle>Rings</PageTitle>
    </Layout>
  );
}
