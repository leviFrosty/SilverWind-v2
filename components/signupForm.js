import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { auth } from "../lib/fbInstance";
import Form from "./form";
import FormSubmitButton from "./FormSubmitButton";
import Input from "./input";

export default function SignupForm() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/");
      })
      .catch((e) => seterror(e.message));
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
        title="password"
        type="password"
        value={password}
        setState={setpassword}
        required
      />
      <FormSubmitButton label="Sign up" />
    </Form>
  );
}
