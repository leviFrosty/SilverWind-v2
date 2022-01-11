import Head from "next/head";
import Link from "next/link";
import React from "react";
import CenterTitle from "../components/CenterTitle";
import Layout, { siteTitlePrefix } from "../components/layout";
import SignupForm from "../components/signupForm";

export default function login() {
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Sign Up</title>
      </Head>
      <div className="mx-auto w-fit max-w-xl min-h-[70vh] flex flex-col items-center justify-center">
        <CenterTitle>Welcome to SilverWinds</CenterTitle>
        <SignupForm />
        <span className="text-violet-900 text-sm opacity-80">
          By clicking &quot;Sign up&quot; you agree to our Terms and Conditions
        </span>
        <Link href="/login">
          <a className="text-violet-900 underline decoration-2 my-2 font-semibold">
            Login
          </a>
        </Link>
      </div>
    </Layout>
  );
}
