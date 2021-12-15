import React from "react";

export default function Input({
  name,
  title,
  type,
  value,
  setState,
  ...options
}) {
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setState(value);
  };

  return (
    <>
      <label htmlFor={name}>{title}</label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        {...options}
      />
    </>
  );
}
