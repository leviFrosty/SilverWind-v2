import Head from "next/head";
import React, { useState } from "react";
import Layout, { siteTitlePrefix } from "../../components/layout";
import PageTitle from "../../components/PageTitle";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../lib/fbInstance";
import { RINGS } from "../../lib/PRODUCT_KEYS";
import Container from "../../components/Container";
import ProductFilter from "../../components/ProductFilter";
import ProductFeed from "../../components/productFeed";
import OrderCustom from "../../components/OrderCustom";

export async function getStaticProps() {
  let products = [];
  const ringsRef = collection(db, "products");
  const querySnapshot = await getDocs(
    query(ringsRef, where("category", "==", RINGS))
  );
  await querySnapshot.forEach((doc) => products.push(doc.data()));
  const enabledProducts = products.filter((product) => product.active == true);
  products = enabledProducts;

  return {
    props: {
      products: products,
    },
    revalidate: 10,
  };
}

export default function Rings({ products }) {
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});

  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Handmade Rings</title>
        <meta
          name="description"
          content="Handcrafted and unique quality rings made specially with love."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Container>
        <PageTitle>Rings</PageTitle>
        <div className="flex flex-col md:flex-row">
          <div>
            <ProductFilter
              sort={sort}
              setSort={setSort}
              setFilter={setFilter}
              filterDisable
            />
          </div>
          <div className=" w-full">
            <ProductFeed sort={sort} filter={filter} products={products} />
          </div>
        </div>
        <section>
          <OrderCustom />
        </section>
      </Container>
    </Layout>
  );
}
