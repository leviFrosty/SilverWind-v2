import Link from "next/link";
import React from "react";

export default function BackToHome() {
  return (
    <div>
      <Link href="/">
        <a>← Back to home</a>
      </Link>
    </div>
  );
}
