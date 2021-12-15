import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <nav>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </nav>
  );
}
