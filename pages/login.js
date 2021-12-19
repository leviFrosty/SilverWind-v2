import Head from "next/head";
import Link from "next/link";
import React from "react";
import CenterTitle from "../components/CenterTitle";
import Layout, { siteTitlePrefix } from "../components/layout";
import LoginForm from "../components/loginForm";

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Login</title>
      </Head>
      <div className="mx-auto w-fit max-w-xl min-h-[70vh] flex flex-col items-center justify-center">
        <CenterTitle>Login to SilverWind</CenterTitle>
        <LoginForm />
        <Link href="/forgot">
          <a className="text-violet-300">Forgot Password</a>
        </Link>
        <Link href="/signup">
          <a className="">Register</a>
        </Link>
      </div>
    </Layout>
  );
}
