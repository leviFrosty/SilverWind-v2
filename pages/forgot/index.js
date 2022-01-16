import React, { useState } from "react";
import { sendPasswordResetEmail } from "@firebase/auth";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Link from "next/link";
import Input from "../../components/input";
import { auth } from "../../lib/fbInstance";
import Head from "next/head";
import { siteTitlePrefix } from "../../components/layout";
import CenterTitle from "../../components/CenterTitle";
import Form from "../../components/form";
import Container from "../../components/Container";

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
          content="Learn how to change or reset your SilverWind password."
        />
      </Head>

      <Container className="flex flex-col justify-center">
        <CenterTitle>Reset your Password</CenterTitle>
        <Form
          onSubmit={handleFormSubmit}
          className="min-w-12 max-w-screen-sm mx-auto flex flex-col gap-2"
        >
          <Input
            name="email"
            title="email"
            type="email"
            value={email}
            setState={setemail}
            required
          />
          <button
            className="text-white rounded-md px-3 py-2 bg-violet-500 hover:bg-violet-700 active:bg-violet-700"
            type="submit"
          >
            Reset Password
          </button>
        </Form>
        <Link href="/login">
          <a className="mx-auto text-violet-900 underline decoration-2 my-2 font-semibold">
            Back to login
          </a>
        </Link>
      </Container>
    </Layout>
  );
}
