import React from "react";
import SpinnerIcon from "../public/icons/circle-notch-solid.svg";

export default function Spinner({ className }) {
  return (
    <React.Fragment>
      <SpinnerIcon
        className={`animate-spin text-violet-900 ${className}`}
        width={40}
        height={40}
      />
    </React.Fragment>
  );
}
