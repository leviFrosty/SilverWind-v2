import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { sortProducts } from "../lib/sortProducts";
import { filterProducts } from "../lib/filterProducts";

export default function ProductFeed({ products, filter, sort }) {
  const [selectedProducts, setselectedProducts] = useState([]);
  // Component Did Mount
  useEffect(() => {
    setselectedProducts(products);
  }, []);

  // Watches filter changes
  useEffect(() => {
    if (filter) {
      filterProducts(filter, products, setselectedProducts);
    }
  }, [filter]);

  // Watches sort changes
  useEffect(() => {
    if (sort) {
      sortProducts(sort, selectedProducts, setselectedProducts);
    }
  }, [sort]);

  return (
    <>
      <h1>Products</h1>
      {selectedProducts.length == 0 ? (
        <h4>Oops! Nothing here.</h4>
      ) : (
        selectedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </>
  );
}
