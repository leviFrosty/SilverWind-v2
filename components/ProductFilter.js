import React, { useState } from "react";
import {
  PRICE_DESC,
  PRICE_ASC,
  CATEGORY,
  RINGS,
  EARRINGS,
  NECKLACES,
} from "../lib/PRODUCT_KEYS";
import FilterButton from "./FilterButton";
import ChevonRight from "../public/icons/chevron-right-solid.svg";

export default function ProductFilter({ setFilter, setSort }) {
  const [filterExpanded, setfilterExpanded] = useState(false);
  const [sortExpanded, setsortExpanded] = useState(false);

  return (
    <aside className="flex flex-col px-2 gap-4 my-2">
      <div className="flex flex-col gap-2 w-[160px]">
        <h3
          className="font-bold text-left text-lg text-violet-300 hover:text-violet-500 cursor-pointer flex items-center"
          onClick={() => setfilterExpanded(!filterExpanded)}
        >
          Filter
          <ChevonRight width={10} height={10} className="inline mx-2" />
        </h3>
        {filterExpanded ? (
          <>
            <FilterButton filter={null} setFilter={setFilter}>
              All
            </FilterButton>
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
          </>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 w-[160px]">
        <h3
          className="font-bold text-left text-lg text-violet-300 hover:text-violet-500 cursor-pointer flex items-center "
          onClick={() => setsortExpanded(!sortExpanded)}
        >
          Sort
          <ChevonRight width={10} height={10} className="inline mx-2" />
        </h3>
        {sortExpanded ? (
          <>
            <button
              className="text-left border-l-4 border-violet-200 px-2 hover:border-violet-300 transition-all"
              onClick={() => setSort({ type: PRICE_ASC })}
            >
              Price Low to High
            </button>
            <button
              className="text-left border-l-4 border-violet-200 px-2 hover:border-violet-300 transition-all"
              onClick={() => setSort({ type: PRICE_DESC })}
            >
              Price High to Low
            </button>
          </>
        ) : null}
      </div>
    </aside>
  );
}
