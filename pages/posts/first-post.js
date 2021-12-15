import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Layout from "/components/layout";

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First post!</title>
      </Head>
      <h1 className="text-xl">First post!</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
}
