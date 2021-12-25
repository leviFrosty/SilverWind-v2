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
    if (filter === null) {
      setselectedProducts(products);
    }
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
    <React.Fragment>
      {selectedProducts.length == 0 ? (
        <div className="h-[30vh]">
          <h4 className="text-violet-900 text-xl text-center">
            Oops! Nothing here. 🤔
          </h4>
        </div>
      ) : (
        <div className="p-2 grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4">
          {selectedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
}
