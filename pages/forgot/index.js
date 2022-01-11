import React, { useState } from "react";
import { sendPasswordResetEmail } from "@firebase/auth";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Link from "next/link";
import Input from "../../components/input";
import { auth } from "../../lib/fbInstance";
import Head from "next/head";
import { siteTitlePrefix } from "../../components/layout";

export default function Forgot() {
  const [email, setemail] = useState("");
  const router = useRouter();
  const FORGOT_SUBMITTED_URL = "/forgot/submitted";

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, email).finally(() =>
      router.push(FORGOT_SUBMITTED_URL)
    );
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Reset Your Password</title>
        <meta
          name="description"
          content="Learn how to change or rest your SilverWind password."
        />
      </Head>
      <h1>Reset your Password</h1>
      <form onSubmit={handleFormSubmit}>
        <Input
          name="email"
          title="email"
          type="email"
          value={email}
          setState={setemail}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      <Link href="/login">
        <a>Back to login</a>
      </Link>
    </Layout>
  );
}
