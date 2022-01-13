import Head from "next/head";
import React, { useState } from "react";
import Layout, { siteTitlePrefix } from "../../components/layout";
import PageTitle from "../../components/PageTitle";
import ProductFeed from "../../components/productFeed";
import OrderCustom from "../../components/OrderCustom";
import ProductFilter from "../../components/ProductFilter";
import { getProducts } from "../../lib/getProducts";
import Container from "../../components/Container";

export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: {
      products: products,
    },
    revalidate: 10,
  };
}

export default function AllProducts({ products }) {
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});

  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} All Products</title>
        <meta
          name="description"
          content="View all SilverWinds products from handmade Rings, Necklaces, Earrings, and more! Filter and search by the product that you want."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Container>
        <PageTitle>Products</PageTitle>
        <div className="flex flex-col md:flex-row">
          <div>
            <ProductFilter
              filter={filter}
              sort={sort}
              setSort={setSort}
              setFilter={setFilter}
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
