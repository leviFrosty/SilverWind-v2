import Head from "next/head";
import React from "react";
import CenterTitle from "../../components/CenterTitle";
import Layout, { siteTitlePrefix } from "../../components/layout";
import ProfileLayout from "../../components/ProfileLayout";

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
        <CenterTitle>Likes</CenterTitle>
        <p className="text-center">Coming soon! 🙊</p>
      </ProfileLayout>
    </Layout>
  );
}
