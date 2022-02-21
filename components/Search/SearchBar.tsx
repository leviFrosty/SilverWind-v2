import React, { useEffect, useState } from "react";
import Input from "../input";
import { useClickOutside } from "@mantine/hooks";
import { Container, Paper } from "@mantine/core";
import { getProducts } from "../../lib/getProducts";
import SearchProductCard from "./SearchProductCard";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [opened, setOpened] = useState(false);
  const [hits, setHits] = useState([]);
  const ref = useClickOutside(() => setOpened(false));

  // Handle focus state
  useEffect(() => {
    if (search !== "") {
      setOpened(true);
    }
    if (search == "") {
      setOpened(false);
    }
  }, [search]);

  // Handle product fetching
  useEffect(() => {
    // Sets state with results of all products
    const fetchProducts = async () => {
      setProducts(await getProducts());
    };
    // Only allows one query to DB unless page is refreshed.
    if (search !== "" && hasSearched == false) {
      setHasSearched(true);
      fetchProducts();
      console.log("fetching products!");
    }
  }, [search, hasSearched]);

  useEffect(() => {
    if (search !== "" && products.length !== 0) {
      const normalizedSearch = search.toLowerCase();
      const found = products.filter((product) => {
        if (
          product.name.toLowerCase().includes(normalizedSearch) ||
          product.category.toLowerCase().includes(normalizedSearch) ||
          product.material.toLowerCase().includes(normalizedSearch) ||
          product.description.toLowerCase().includes(normalizedSearch) ||
          product.id.toLowerCase().includes(normalizedSearch) ||
          product.price.toLowerCase().includes(normalizedSearch)
        ) {
          return true;
        }
      });
      setHits(found);
    }
  }, [search]);

  return (
    <Container ref={ref} className="flex w-full items-center relative p-0">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOpened(true);
        }}
        className="relative"
      >
        <Input
          type="text"
          name="SearchBar"
          value={search}
          setState={setSearch}
          title={""}
          className="h-8 mb-0"
        />
      </form>
      {opened && (
        <Paper
          shadow="sm"
          className="bg-violet-900 text-white w-[400px] absolute p-2 top-14 right-0"
        >
          {hits.length !== 0 ? (
            <div className="flex flex-col gap-1 max-h-96 overflow-y-auto overflow-x-hidden">
              {hits.map((product) => (
                <SearchProductCard product={product} key={product.id} />
              ))}
            </div>
          ) : (
            <p className="text-center py-6">Nothing found! 😟</p>
          )}
        </Paper>
      )}
    </Container>
  );
}
