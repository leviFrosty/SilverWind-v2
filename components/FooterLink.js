import Link from "next/link";
import React from "react";

export default function FooterLink({ href, children }) {
  return (
    <li className="hover:underline decoration-solid my-4 opacity-75">
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </li>
  );
}
