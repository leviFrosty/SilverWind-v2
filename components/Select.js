import React from "react";

export default function Select({
  name,
  title,
  type,
  value,
  setState,
  children,
  ...options
}) {
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setState(value);
  };

  return (
    <React.Fragment>
      <label
        className="block text-md font-medium text-violet-900"
        htmlFor={name}
      >
        {title}
      </label>
      <select
        className="rounded-md focus:border-violet-600 block w-full bg-violet-100 border-violet-200 px-3 py-2 focus:ring-violet-500"
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        {...options}
      >
        {children}
      </select>
    </React.Fragment>
  );
}
