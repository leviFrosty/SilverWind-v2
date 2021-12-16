import Head from "next/head";
import React from "react";
import Layout, { siteTitlePrefix } from "../../components/layout";

export default function ResetSuccess() {
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Password Reset!</title>
      </Head>
      <h1>Reset Success</h1>
    </Layout>
  );
}
