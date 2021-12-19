import Head from "next/head";
import React from "react";
import Layout, { siteTitlePrefix } from "../components/layout";

export default function About() {

  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} About</title>
      </Head>
      <h1>About SilverWind</h1>
      <p>
        Silverwind was established in 2020 by Julia Hodory. It started as a
        dream. Slowly over the course of months, she began gathering the skills
        necessary to create the fine art pieces you see before you here.
      </p>
    </Layout>
  );
}


