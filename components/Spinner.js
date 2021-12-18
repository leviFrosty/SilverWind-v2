import React from "react";
import SpinnerIcon from "../public/icons/circle-notch-solid.svg"

export default function Spinner() {
  return (
    <>
      <SpinnerIcon className="animate-spin text-violet-900" width={40} height={40}/>
      </>
  );
}
