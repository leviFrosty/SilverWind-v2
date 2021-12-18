import React from "react";

export default function PageTitle({ children }) {
  return (
    <div className="flex flex-col-reverse w-fit mx-auto my-2 md:mx-0">
      <h1 className="text-xl text-violet-900 font-bold">{children}</h1>
      <p className="text-sm text-right text-violet-300 ">by Julia</p>
    </div>
  );
}
