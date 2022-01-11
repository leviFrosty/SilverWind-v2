import Head from "next/head";
import Link from "next/link";
import React from "react";
import CenterTitle from "../components/CenterTitle";
import Container from "../components/Container";
import Layout, { siteTitlePrefix } from "../components/layout";

export default function returnpolicy() {
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Return Policy</title>
        <meta
          name="description"
          content="SilverWind's Return and Exchange Policy."
        />
      </Head>
      <Container>
        <CenterTitle>Return and Exchange Policy</CenterTitle>
        <div className="text-violet-900 flex flex-col gap-2">
          <p>Custom orders are non-returnable and non-refundable.</p>
          <p>
            Regular orders can be returned within 7 days of receipt in their
            original packaging and in the case of jewelry, in unworn condition.
            The client is responsible for returning the item(s).
          </p>
          <p>Credit issued will not include original shipping.</p>
          <p>
            We reserve the right to not accept a return and may require a
            re-stocking or repair fee if the item has been at all damaged or
            worn.
          </p>
          <p>
            You will be refunded for your order after we receive it. Return
            payments may take up to 2 weeks to process.
          </p>
          <p className="font-semibold">
            While our policies are firm for obvious reasons, we will do
            everything we can to work with you and make sure your experience
            with is positive.
          </p>
        </div>
      </Container>
    </Layout>
  );
}
