import React, { useState } from "react";
import Input from "./input";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useRouter } from "next/router";
import Form from "./form";
import FormSubmitButton from "./FormSubmitButton";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../lib/fbInstance";
import initializeUserData from "../lib/auth/initializeUserData";

export default function LoginForm({ redirectTo }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (redirectTo) {
          router.push(redirectTo);
        } else {
          router.push({ pathname: "/" });
        }
      })
      .catch((error) => setError(error.message));
  };

  const handleSignInAnonymously = async () => {
    await signInAnonymously(auth)
      .then(async (userCredential) => {
        const { uid } = userCredential.user;
        await initializeUserData(uid);
        if (redirectTo) {
          router.push(redirectTo);
        } else {
          router.push("/products");
        }
      })
      .catch((error) => setError(error.message));
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit} error={error} className="mt-4 w-full">
        <Input
          name="email"
          title="email"
          type="email"
          value={email}
          setState={setemail}
          required
        />
        <Input
          name="password"
          title="Password"
          type="password"
          value={password}
          setState={setpassword}
          required
        />
        <FormSubmitButton label="Login" />
      </Form>
      <button
        onClick={() => handleSignInAnonymously()}
        className="rounded-md border-2 border-violet-500 cursor-pointer text-violet-500 hover:bg-violet-500 hover:text-white text-lg w-full text-center py-2 my-3"
      >
        Sign in as Guest
      </button>
    </React.Fragment>
  );
}
