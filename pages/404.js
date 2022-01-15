import Head from "next/head";
import Link from "next/link";
import React from "react";
import CenterTitle from "../components/CenterTitle";
import Container from "../components/Container";
import Layout, { siteTitlePrefix } from "../components/layout";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Not Found</title>
        <meta
          name="description"
          content="You look lost. Or maybe I'm lost. Either way, let's get back home."
        />
      </Head>
      <Container>
        <CenterTitle>Not Found 😨</CenterTitle>
        <p className="text-violet-900 text-center text-lg mt-8">
          Not to worry!
        </p>
        <p className="text-violet-900 text-center my-1 text-lg">
          Let&apos;s get you{" "}
          <Link href="/">
            <a className="bg-violet-500 rounded-md px-3 py-1 hover:bg-violet-700 text-white">
              ← home
            </a>
          </Link>
        </p>
        <p className="text-center mt-10 text-xs">
          You can report a bug with this page{" "}
          <a
            href="https://github.com/leviFrosty/SilverWind-v2/issues"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-2 decoration-violet-400 hover:decoration-violet-800"
          >
            here.
          </a>
        </p>
      </Container>
    </Layout>
  );
}
