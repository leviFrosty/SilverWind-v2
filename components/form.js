import React from "react";

export default function Form({ onSubmit, error, children }) {
  return (
    <form onSubmit={onSubmit}>
      {children}
      {error ? <p>{error}</p> : null}
    </form>
  );
}
