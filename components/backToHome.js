import Link from "next/link";
import React from "react";

export default function BackToHome() {
  return (
    <div className="my-4 md:my-6 px-4 lg:px-16 py-1 relative backToHome w-fit">
      <Link href="/">
        <a className="text-lg flex flex-row items-center">
          <span className="relative transition-all mr-2 text-lg md:text-xl text-violet-500">
            ←
          </span>{" "}
          <p className="text-violet-500 text-sm md:text-xl">Back to home</p>
        </a>
      </Link>
    </div>
  );
}
