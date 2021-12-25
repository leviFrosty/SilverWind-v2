import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import PageTitle from "../../components/PageTitle";
import { db } from "../../lib/fbInstance";
import SpinnerFullScreen from "../../components/SpinnerFullScreen";
import ImageSelector from "../../components/ImageSelector";
import ProductInfo from "../../components/ProductInfo";
import Container from "../../components/Container";

export default function ProductDetails({ product }) {
  const router = useRouter();
  return (
    <React.Fragment>
      <Layout>
        {router.isFallback ? (
          <SpinnerFullScreen />
        ) : (
          <Container>
            <PageTitle>{product.name}</PageTitle>
            <div className="flex flex-col gap-2 md:gap-8 md:flex-row justify-center">
              <ImageSelector product={product} />
              <ProductInfo product={product} />
            </div>
          </Container>
        )}
      </Layout>
    </React.Fragment>
  );
}

export async function getStaticPaths() {
  const querySnapshot = await getDocs(collection(db, "products"));
  let docIds = [];
  await querySnapshot.forEach((doc) => docIds.push(doc.id));
  const paths = docIds.map((id) => ({
    params: { id },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  const {
    params: { id },
  } = context;
  const docRef = await doc(db, "products", id);
  let product = {};
  await getDoc(docRef)
    .then((doc) => {
      product = doc.data();
    })
    .catch((e) => console.log(e));
  return {
    props: {
      product,
    },
    revalidate: 60,
  };
}
