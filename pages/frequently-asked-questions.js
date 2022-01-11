import Head from "next/head";
import Link from "next/link";
import React from "react";
import CenterTitle from "../components/CenterTitle";
import Container from "../components/Container";
import Layout, { siteTitlePrefix } from "../components/layout";

export default function faq() {
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Frequently Asked Questions</title>
        <meta
          name="description"
          content="Concise answers to SilverWind's most frequently asked questions."
        />
      </Head>
      <Container>
        <CenterTitle>Frequently Asked Questions</CenterTitle>
        <div className="text-violet-900 flex flex-col gap-2">
          <p>Under Construction. 🚧</p>
        </div>
      </Container>
    </Layout>
  );
}
