import Head from "next/head";
import React from "react";
import Layout, { siteTitlePrefix } from "../../components/layout";
import PageTitle from "../../components/PageTitle";

export default function Rings() {
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Rings</title>
      </Head>
      <PageTitle>Rings</PageTitle>
    </Layout>
  );
}
