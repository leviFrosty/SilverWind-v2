import Head from "next/head";
import React from "react";
import Layout, { siteTitlePrefix } from "../components/layout";

export default function login() {
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Sign Up</title>
      </Head>
      <h1>Sign Up</h1>
    </Layout>
  );
}
