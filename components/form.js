import React from "react";

export default function Form({ onSubmit, error, children, ...props }) {
  return (
    <form onSubmit={onSubmit} {...props}>
      {children}
      {error ? <p>{error}</p> : null}
    </form>
  );
}
