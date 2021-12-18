import Link from "next/link";
import React from "react";

export default function BackToHome() {
  return (
    <div className="my-2 mx-3 px-3 py-1 relative backToHome bg-violet-100 rounded-md w-fit ">
      <Link href="/">
        <a className="text-lg flex flex-row"><span className="relative transition-all">←</span> <p>Back to home</p></a>
      </Link>
    </div>
  );
}
