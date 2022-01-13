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

export default function ProductFilter({
  filter,
  sort,
  setFilter,
  setSort,
  filterDisable,
}) {
  const [filterExpanded, setfilterExpanded] = useState(true);
  const [sortExpanded, setsortExpanded] = useState(true);

  return (
    <aside className="flex flex-col px-2 gap-4 my-2">
      {!filterDisable == true ? (
        <div className="flex flex-col gap-2 md:w-[160px] w-full">
          <h3
            className="font-bold text-left text-lg text-violet-300 hover:text-violet-500 cursor-pointer flex items-center"
            onClick={() => setfilterExpanded(!filterExpanded)}
          >
            Filter
            {filterExpanded ? (
              <ChevonRight
                width={10}
                height={10}
                className="inline mx-2 rotate-90 transition-all"
              />
            ) : (
              <ChevonRight
                width={10}
                height={10}
                className="inline mx-2 transition-all"
              />
            )}
          </h3>
          {filterExpanded ? (
            <div className="flex flex-row md:flex-col justify-between">
              <FilterButton
                filter={{}}
                setFilter={setFilter}
                style={{ fontWeight: filter.value == undefined ? "bold" : "" }}
              >
                All
              </FilterButton>
              <FilterButton
                filter={{ type: CATEGORY, value: RINGS }}
                style={{ fontWeight: filter.value == RINGS ? "bold" : "" }}
                setFilter={setFilter}
              >
                Rings
              </FilterButton>
              <FilterButton
                filter={{ type: CATEGORY, value: NECKLACES }}
                style={{ fontWeight: filter.value == NECKLACES ? "bold" : "" }}
                setFilter={setFilter}
              >
                Necklaces
              </FilterButton>
              <FilterButton
                filter={{ type: CATEGORY, value: EARRINGS }}
                style={{ fontWeight: filter.value == EARRINGS ? "bold" : "" }}
                setFilter={setFilter}
              >
                Earrings
              </FilterButton>
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="flex flex-col gap-2 w-[160px]">
        <h3
          className="font-bold text-left text-lg text-violet-300 hover:text-violet-500 cursor-pointer flex items-center "
          onClick={() => setsortExpanded(!sortExpanded)}
        >
          Sort
          {sortExpanded ? (
            <ChevonRight
              width={10}
              height={10}
              className="inline mx-2 rotate-90 transition-all"
            />
          ) : (
            <ChevonRight
              width={10}
              height={10}
              className="inline mx-2 transition-all"
            />
          )}
        </h3>
        {sortExpanded ? (
          <div className="flex flex-col gap-2 w-[160px]">
            <button
              className="text-center rounded-md bg-violet-100 px-2 py-1 md:bg-inherit md:rounded-none md:text-left md:border-l-4 md:border-violet-200 md:hover:border-violet-300 transition-all text-violet-900"
              onClick={() => setSort({ type: PRICE_ASC })}
            >
              Price Low to High
            </button>
            <button
              className="text-center rounded-md bg-violet-100 px-2 py-1 md:bg-inherit md:rounded-none md:text-left md:border-l-4 md:border-violet-200 md:hover:border-violet-300 transition-all text-violet-900"
              onClick={() => setSort({ type: PRICE_DESC })}
            >
              Price High to Low
            </button>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
