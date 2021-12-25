import Head from "next/head";
import Link from "next/link";
import React from "react";
import CenterTitle from "../../components/CenterTitle";
import Layout, { siteTitlePrefix } from "../../components/layout";

export default function ResetSuccess() {
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Password Reset!</title>
      </Head>
      <div className="h-[70vh] flex items-center justify-center flex-col">
        <CenterTitle>Reset Success! 🤕</CenterTitle>
        <p className="text-center text-violet-900">
          You should recieve an email shortly if there is an account linked to
          your email.
        </p>
        <p className="text-center text-violet-200 text-sm">
          {`Surely you won't forget it this time...`}
        </p>
        <Link href="/login">
          <a className="text-center rounded-md bg-violet-900 hover:bg-violet-500 active:bg-violet-500 text-white px-12 py-2 my-8">
            Login
          </a>
        </Link>
      </div>
    </Layout>
  );
}
