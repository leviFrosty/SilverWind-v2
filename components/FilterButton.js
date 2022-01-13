import React from "react";

export default function FilterButton({ filter, setFilter, children, style }) {
  return (
    <button
      style={style}
      className="text-center rounded-md bg-violet-100 px-2 py-1 md:bg-inherit md:rounded-none md:text-left md:border-l-4 md:border-violet-200 md:hover:border-violet-300 transition-all text-violet-900"
      onClick={() => setFilter(filter)}
    >
      {children}
    </button>
  );
}
