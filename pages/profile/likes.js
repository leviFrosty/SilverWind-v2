import Head from "next/head";
import React from "react";
import CenterTitle from "../../components/CenterTitle";
import Layout, { siteTitlePrefix } from "../../components/layout";
import ProfileLayout from "../../components/ProfileLayout";
import Container from './../../components/Container';

export default function Likes() {
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Likes</title>
        <meta
          name="description"
          content="Keep track of your liked products on SilverWind."
        />
      </Head>
      <ProfileLayout>
        <Container>
          <CenterTitle>Likes</CenterTitle>
          <p className="text-center">Coming soon! 🙊</p>
        </Container>
      </ProfileLayout>
    </Layout>
  );
}
