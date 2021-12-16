import Head from "next/head";
import React from "react";
import Layout, { siteTitlePrefix } from "../../components/layout";
import PageTitle from "../../components/PageTitle";

export default function Necklaces() {
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Necklaces</title>
      </Head>
      <PageTitle>Necklaces</PageTitle>
    </Layout>
  );
}
