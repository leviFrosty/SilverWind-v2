import React, { useState } from "react";
import Input from "./input";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../lib/fbInstance";
import Form from "./form";

export default function LoginForm() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => router.push("/"))
      .catch((error) => seterror(error.message));
  };

  return (
    <Form onSubmit={handleSubmit} error={error}>
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
      <button type="submit">Login</button>
    </Form>
  );
}
