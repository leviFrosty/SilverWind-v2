import Link from "next/link";
import React, { useContext } from "react";
import UserContext from "../contexts/userContext";

export default function Nav() {
  const user = useContext(UserContext);

  return (
    <nav>
      <Link href="/">
        <a>SilverWind</a>
      </Link>
      <Link href="/about">
        <a>about us</a>
      </Link>
      <Link href="/portfolio">
        <a>portfolio</a>
      </Link>
      <Link href="/about">
        <a>categories</a>
      </Link>
      <Link href="/products/rings">
        <a>rings</a>
      </Link>
      <Link href="/products/necklaces">
        <a>necklaces</a>
      </Link>
      <Link href="/products/earrings">
        <a>earrings</a>
      </Link>
      {user ? user.email : null}
    </nav>
  );
}
