import React from "react";
import {
  PRICE_DESC,
  PRICE_ASC,
  CATEGORY,
  RINGS,
  EARRINGS,
  NECKLACES,
} from "../lib/PRODUCT_KEYS";
import FilterButton from "./FilterButton";

export default function ProductFilter({ setFilter, setSort }) {
  return (
    <aside>
      <h3>Filter</h3>
      <FilterButton
        filter={{ type: CATEGORY, value: RINGS }}
        setFilter={setFilter}
      >
        Rings
      </FilterButton>
      <FilterButton
        filter={{ type: CATEGORY, value: NECKLACES }}
        setFilter={setFilter}
      >
        Necklaces
      </FilterButton>
      <FilterButton
        filter={{ type: CATEGORY, value: EARRINGS }}
        setFilter={setFilter}
      >
        Earrings
      </FilterButton>

      <h3>Sort</h3>
      <button onClick={() => setSort({ type: PRICE_ASC })}>
        Price Low to High
      </button>
      <button onClick={() => setSort({ type: PRICE_DESC })}>
        Price High to Low
      </button>
    </aside>
  );
}
