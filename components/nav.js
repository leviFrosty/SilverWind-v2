import Link from "next/link";
import React, { useContext } from "react";
import UserContext from "../contexts/userContext";

export default function Nav() {
  const user = useContext(UserContext);

  return (
    <nav>
      <Link href="/login">
        <a>Login!</a>
      </Link>
      <Link href="/signup">
        <a>Signup</a>
      </Link>
      {user ? user.email : null}
    </nav>
  );
}
