import Head from "next/head";
import React from "react";
import CenterTitle from "../../components/CenterTitle";
import Layout, { siteTitlePrefix } from "../../components/layout";

export default function success() {
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Custom Order Complete!</title>
        <meta
          name="description"
          content="Your custom jewelry order has been delivered."
        />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <CenterTitle>Success! 🥳</CenterTitle>
      <p className="text-center">
        Your custom order has been delivered. Please allow up to 48 hours for an
        initial response. 
      </p>
    </Layout>
  );
}
