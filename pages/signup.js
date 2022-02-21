import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import CenterTitle from "../components/CenterTitle";
import Layout, { siteTitlePrefix } from "../components/layout";
import SignupForm from "../components/signupForm";
import UserContext from "../contexts/userContext";

export default function Login() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Sign Up</title>
        <meta
          name="description"
          content="Fill out the form to join SilverWind today. Sign up to get access to special pieces that will not be seen elsewhere."
        />
      </Head>
      <div className="mx-auto w-fit max-w-xl min-h-[70vh] flex flex-col items-center justify-center">
        <CenterTitle>Welcome to SilverWind</CenterTitle>
        {user && user.isAnonymous ? (
          <p>To continue, you must create an account.</p>
        ) : null}
        <SignupForm redirectTo={router.query.redirectTo} />
        <span className="text-violet-900 text-sm opacity-80">
          By clicking &quot;Sign up&quot; you agree to our{" "}
          <Link href="/terms-and-conditions">
            <a className="underline">Terms and Conditions</a>
          </Link>
        </span>
        <Link href="/login">
          <a className="text-violet-900 underline decoration-2 my-2 font-semibold">
            Login
          </a>
        </Link>
      </div>
    </Layout>
  );
}
