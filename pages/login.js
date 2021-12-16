import Head from "next/head";
import React from "react";
import Layout, { siteTitlePrefix } from "../components/layout";
import LoginForm from "../components/loginForm";

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Login</title>
      </Head>
      <h1>Login Page</h1>
      <LoginForm />
    </Layout>
  );
}
