import React from "react";

export default function FilterButton({ filter, setFilter, children }) {
  return (
    <button
      className="text-left border-l-4 border-violet-200 px-2 hover:border-violet-300 transition-all text-violet-900"
      onClick={() => setFilter(filter)}
    >
      {children}
    </button>
  );
}
