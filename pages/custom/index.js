import Head from "next/head";
import React from "react";
import Container from "../../components/Container";
import Layout, { siteTitlePrefix } from "../../components/layout";
import OrderCustomPage from "../../components/OrderCustomPage";

export default function Custom() {
  return (
    <>
      <Head>
        <title>{siteTitlePrefix} Submit Custom Order</title>
        <meta
          name="description"
          content="Order a custom SilverWind handmade piece of Jewelry to your details."
        />
      </Head>
      <Layout>
        <Container className="justify-center px-4">
          <OrderCustomPage />
        </Container>
      </Layout>
    </>
  );
}
