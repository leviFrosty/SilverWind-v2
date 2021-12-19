import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import PageTitle from "../../components/PageTitle";
import { db } from "../../lib/fbInstance";
import Spinner from "../../components/Spinner";
import ImageSelector from "../../components/ImageSelector";
import ProductInfo from "../../components/ProductInfo";

export default function ProductDetails({ product }) {
  const router = useRouter();
  if (product == undefined) {
    router.replace(-1);
  }

  return (
    <Layout>
      {router.isFallback ? <Spinner /> : null}
      <div className="flex flex-col justify-items-center">
        <PageTitle>{product.name}</PageTitle>
        <div className="flex flex-col md:flex-row justify-center">
          <ImageSelector product={product} />
          <ProductInfo product={product} />
        </div>
      </div>
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
    revalidate: 60,
  };
}
