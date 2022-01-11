import React from "react";
import Link from "next/link";
import CenterTitle from "../components/CenterTitle";
import LoginForm from "../components/loginForm";

export default function LoginPage({ redirectTo }) {

  
  return (
    <div className="mx-auto w-fit max-w-xl min-h-[70vh] flex flex-col items-center justify-center">
      <CenterTitle>Login to SilverWind</CenterTitle>
      <LoginForm redirectTo={redirectTo} />
      <Link href="/forgot">
        <a className="text-violet-300">Forgot Password</a>
      </Link>
      <Link href="/signup">
        <a className="text-violet-900 underline decoration-2 my-2 font-semibold">
          Register
        </a>
      </Link>
    </div>
  );
}
