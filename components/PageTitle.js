import React from "react";

export default function PageTitle({ children }) {
  return (
    <div className="flex flex-col-reverse w-fit ml-auto mr-10 my-2 md:ml-0 md:mr-0">
      <h1 className="text-2xl text-violet-900 font-bold">{children}</h1>
      <p className="text-sm text-right text-violet-300 ">by Julia</p>
    </div>
  );
}
