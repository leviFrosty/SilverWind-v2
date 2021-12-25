import React from "react";
import ChevronRight from "../public/icons/chevron-right-solid.svg";
import ChevronDown from "../public/icons/chevron-down-solid.svg";

export default function FooterListHead({ openState, setIsOpen, children }) {
  return (
    <li
      className="font-bold my-4 md:my-0 flex items-center cursor-pointer md:cursor-default"
      onClick={() => setIsOpen(!openState)}
    >
      {children}
      {openState ? (
        <ChevronRight
          height={12}
          className="inline ml-2 md:hidden rotate-90 transition-all"
        />
      ) : (
        <ChevronRight
          height={12}
          className="inline ml-2 md:hidden transition-all"
        />
      )}
    </li>
  );
}
