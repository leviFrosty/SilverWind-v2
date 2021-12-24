import Head from "next/head";
import React from "react";
import Layout, { siteTitlePrefix } from "../../components/layout";
import PageTitle from "../../components/PageTitle";

export default function Earrings() {
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Earrings</title>
      </Head>
      <PageTitle>Earrings</PageTitle>
    </Layout>
  );
}
