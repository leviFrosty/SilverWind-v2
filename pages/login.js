import Head from "next/head";
import React from "react";
import Layout, { siteTitlePrefix } from "../components/layout";

export default function login() {
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Login</title>
      </Head>
      <h1>Login Page</h1>
    </Layout>
  );
}
