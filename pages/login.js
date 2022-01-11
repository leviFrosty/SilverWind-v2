import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Layout, { siteTitlePrefix } from "../components/layout";
import LoginPage from "../components/LoginPage";

export default function Login() {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Login</title>
        <meta
          name="description"
          content="Login to your SilverWind account."
        />
      </Head>
      <LoginPage redirectTo={router.query.redirectTo} />
    </Layout>
  );
}
