import Head from "next/head";
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
      </div>
    </Layout>
  );
}
