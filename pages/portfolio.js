import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import Modal from "react-modal";
import Container from "../components/Container";
import Layout, { siteTitlePrefix } from "../components/layout";
import PageTitle from "../components/PageTitle";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/fbInstance";
import OrderCustom from "../components/OrderCustom";
import TimesSolid from "../public/icons/times-solid.svg";


export async function getStaticProps() {
  const listRef = ref(storage, "assets/portfolio_page/");
  let images = [];
  const lists = await listAll(listRef);
  for (let item of lists.items) {
    const url = await getDownloadURL(item);
    images.push(url);
  }
  return {
    props: { images },
  };
}

export default function Portfolio({ images }) {
  const [selectedImage, setSelectedImage] = useState("");
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Portfolio</title>
        <meta
          name="description"
          content="View SilverWind's best jewelry pieces, all made by hand."
        />
      </Head>
      <Container>
        <PageTitle>Portfolio</PageTitle>
        <Modal
          style={{
            content: {
              display: "flex",
              overflow: "hidden",
              padding: "0px",
              alignItems: "center",
            },
          }}
          isOpen={modalIsOpen}
          onRequestClose={() => setmodalIsOpen(false)}
        >
          <img
            src={selectedImage}
            alt=""
            className="w-full max-h-full object-contain"
          />
          <div
            className="absolute top-[2%] right-[2%] w-8"
            onClick={() => setmodalIsOpen(false)}
            alt="close modal"
          >
            <TimesSolid className="text-gray-400 hover:text-gray-500 transition-color cursor-pointer" />
          </div>
        </Modal>
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-8 my-2">
          {images.map((image, index) => {
            return (
              <figure
                className={`relative w-full
                ${index == 0 ? "h-full row-span-2 col-span-2" : "h-[270px]"}
                `}
                onClick={() => {
                  setSelectedImage(image);
                  setmodalIsOpen(true);
                }}
              >
                <Image
                  src={image}
                  alt=""
                  layout="fill"
                  key={index}
                  className="w-full h-full object-cover"
                />
              </figure>
            );
            console.log(index, image);
          })}
        </div>
        <section className="text-violet-900 my-4 mx-2">
          <p className="my-2">
            These are just some of my favorite custom pieces I've made. All of
            these are avaiable for order at the link below.
          </p>
          <p>
            <span className="font-semibold">Best part? </span>You can change
            anything you don't like or request something else!
          </p>
        </section>
        <OrderCustom />
      </Container>
    </Layout>
  );
}
