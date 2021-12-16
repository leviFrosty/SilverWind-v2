import React from "react";

export default function FilterButton({ filter, setFilter, children }) {
  return <button onClick={() => setFilter(filter)}>{children}</button>;
}
