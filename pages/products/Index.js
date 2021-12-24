import Head from "next/head";
import React, { useState } from "react";
import Layout, { siteTitlePrefix } from "../../components/layout";
import PageTitle from "../../components/PageTitle";
import ProductFeed from "../../components/productFeed";
import ProductFilter from "../../components/ProductFilter";
import { getProducts } from "../../lib/getProducts";
import Container from '../../components/Container';

export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: {
      products: products,
    },
    revalidate: 30,
  };
}

export default function AllProducts({ products }) {
  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState(null);

  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} All Products</title>
      </Head>
      <Container>
      <PageTitle>Products</PageTitle>
        <ProductFilter setSort={setSort} setFilter={setFilter} />
        <ProductFeed sort={sort} filter={filter} products={products} />
      </Container>
    </Layout>
  );
}
