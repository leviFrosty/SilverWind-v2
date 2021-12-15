import React, { useState } from "react";
import Input from "./input";

export default function LoginForm() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(email, password);
      }}
    >
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
      <button type="submit">Submit</button>
    </form>
  );
}
