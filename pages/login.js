import Head from "next/head";
import React from "react";
import Layout, { siteTitlePrefix } from "../components/layout";
import LoginPage from "../components/LoginPage";

export default function Login() {
  
  
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Login</title>
      </Head>
      <LoginPage />
    </Layout>
  );
}
