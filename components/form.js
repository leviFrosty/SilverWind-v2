import React from "react";

export default function Form({ onSubmit, error, children, ...props }) {
  return (
    <form onSubmit={onSubmit} {...props}>
      {children}
      {error ? <p className="font-bold text-red-600 text-center">{error}</p> : null}
    </form>
  );
}
