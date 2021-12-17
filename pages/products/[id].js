import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import Layout from "../../components/layout";
import PageTitle from "../../components/PageTitle";
import { db } from "../../lib/fbInstance";

export default function ProductDetails({ product }) {
  useEffect(() => {
    console.log(product);
  }, []);

  return (
    <Layout>
      <PageTitle>{product.name}</PageTitle>
    </Layout>
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
  await getDoc(docRef).then((doc) => {
    product = doc.data();
  });
  return {
    props: {
      product,
    },
  };
}
