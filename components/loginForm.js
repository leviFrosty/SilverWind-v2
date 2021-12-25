import React, { useState } from "react";
import Input from "./input";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../lib/fbInstance";
import Form from "./form";
import FormSubmitButton from "./FormSubmitButton";

export default function LoginForm({ redirectTo }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (redirectTo) {
          router.push(redirectTo);
        } else {
          router.push("/");
        }
      })
      .catch((error) => seterror(error.message));
  };

  return (
    <Form onSubmit={handleSubmit} error={error} className="my-4 w-full">
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
  );
}
