import Head from "next/head";
import Link from "next/link";
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
      <Link href="/forgot">
        <a>Forgot Password</a>
      </Link>
      <Link href="/signup">
        <a>Signup</a>
      </Link>
    </Layout>
  );
}
