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
      </Head>
      <Layout>
        <Container className="justify-center px-4">
          <OrderCustomPage />
        </Container>
      </Layout>
    </>
  );
}
