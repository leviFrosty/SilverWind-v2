import Link from "next/link";
import React from "react";

export default function Nav({ user }) {
  return (
    <nav>
      <Link href="/login">
        <a>Login</a>
      </Link>
      {user ? user.email : null}
    </nav>
  );
}
