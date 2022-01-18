import React from "react";

export default function Input({
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
      <input
        className={`${type === 'file' ? "text-violet-400"  : "text-violet-900" } focus:invalid:border-red-300 invalid:border-2 file:rounded-md mb-4 file:mr-2  file:bg-violet-500 file:text-white file:px-5 file:py-1 file:border-0 file:hover:bg-violet-600 placeholder:text-gray-500 placeholder:opacity-50 rounded-md focus:border-violet-600 block w-full bg-violet-100 border-violet-200 px-3 py-2 focus:ring-violet-500`}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        {...options}
      >
        {children}
      </input>
    </React.Fragment>
  );
}
