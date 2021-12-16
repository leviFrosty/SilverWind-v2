import Head from "next/head";
import React from "react";
import Layout, { siteTitlePrefix } from "../../components/layout";

export default function AllProducts() {
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} All Products</title>
      </Head>
      <h1>All Products</h1>
    </Layout>
  );
}
