import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { auth, db } from "../lib/fbInstance";
import Form from "./form";
import FormSubmitButton from "./FormSubmitButton";
import Input from "./input";
import Select from "./Select";
import { signupSchema } from "../schemas/auth/signupSchema";

export default function SignupForm() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [gender, setgender] = useState("");
  const [error, seterror] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { value, error } = signupSchema.validate({
      email,
      password,
      firstName,
      lastName,
      gender,
    });
    if (error) return seterror(error.message);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const { uid } = userCredential.user;
        let stripeCustomerId;
        // Adds user document for extra user data in Firebase.
        await axios
          .post("/api/stripe/create-customer", {
            name: `${firstName} ${lastName}`,
            email,
            uid,
          })
          .then((res) => (stripeCustomerId = res.data.id));
        const docData = {
          firstName,
          lastName,
          gender,
          email,
          cart: [],
          likes: [],
          purchases: [],
          stripeCustomerId,
          isAdmin: false,
        };
        setDoc(doc(db, "users", uid), docData)
          .then(() => {
            navigate("/welcome", { replace: true });
          })
          .catch((e) => {
            console.log(e);
          });
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
        name="firstName"
        title="first name"
        type="text"
        value={firstName}
        setState={setfirstName}
        required
      />
      <Input
        name="lastName"
        title="last name"
        type="text"
        value={lastName}
        setState={setlastName}
        required
      />
      <Select
        id="category"
        title="category"
        required
        value={gender}
        setState={setgender}
      >
        <option>-- select gender -- </option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </Select>
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
