import Head from "next/head";
import Image from "next/image";
import React from "react";
import Container from "../components/Container";
import Layout, { siteTitlePrefix } from "../components/layout";
import PageTitle from "../components/PageTitle";
import { getDownloadURL, ref, list } from "@firebase/storage";
import { storage } from "../lib/fbInstance";

export async function getStaticProps() {
  const listRef = await ref(storage, "assets/about_page");
  const imageRef = await list(listRef, { maxResults: 1 });
  const portraitUrl = await getDownloadURL(imageRef.items[0]);
  return {
    props: { PORTRAIT_PHOTO_URL: portraitUrl },
  };
}

export default function About({ PORTRAIT_PHOTO_URL }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} About</title>
        <meta
          name="description"
          content="The story of how Julia Hodory started SilverWind Jewelry starting from a little workbench and $100."
        />
      </Head>
      <Container>
        <PageTitle>About SilverWind</PageTitle>
        <div className="flex flex-col md:flex-row mt-8 text-violet-900">
          <div className="leading-8 text-lg px-2 md:px-4 flex flex-col gap-4">
            <p>
              Silverwind was established in 2020. It started just an idea and
              something to do during the pandemic. I began to watch YouTube
              videos teaching myself the trade.
            </p>
            <p>
              At first I was terrible, I felt like I couldn't do anything.
              However, I grew to love it and grew to learn the techniques that
              eventually made me want to spend more of my time smithing.
            </p>
            <p>
              Now here we are, in {new Date().getFullYear()}. I have made over
              100 pieces of jewelry and I'm proud of my work. I hope you enjoy
              your piece as much as I enjoyed making it.
            </p>
            <p className="text-xl">
              <span className="font-bold">&mdash;</span> Julia
            </p>
          </div>
          <div className="relative h-[500px] w-full overflow-hidden rounded-md mt-4 md:mt-0">
              <Image
              src={PORTRAIT_PHOTO_URL}
              alt="Julia Hodory"
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
}
