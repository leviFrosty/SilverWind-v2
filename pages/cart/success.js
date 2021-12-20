import Head from "next/head";
import Link from "next/link";
import React from "react";
import CenterTitle from "../../components/CenterTitle";
import Container from "../../components/Container";
import Layout, { siteTitlePrefix } from "../../components/layout";

export default function success() {
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Thank you!</title>
      </Head>
      <Container>
        <div className="flex flex-col text-center h-[68vh] justify-center px-8">
          <CenterTitle>Success!✨</CenterTitle>
          <p className="text-center text-violet-900">
            Your order has been recieved. You will recieve an email receipt
            shortly.
          </p>
        </div>
        <div className="text-center my-8 px-8">
          <p className="text-violet-900 text-xl">Have a problem?</p>
          <Link href="/contact">
            <a className="decoration-violet-400 decoration-solid decoration-2 underline-offset-1 underline font-bold text-md text-violet-900">
              Contact Us.
            </a>
          </Link>
        </div>
      </Container>
    </Layout>
  );
}
