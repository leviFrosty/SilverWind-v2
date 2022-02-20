import axios from "axios";
import {
  createUserWithEmailAndPassword,
  linkWithRedirect,
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { auth, db } from "../lib/fbInstance";
import Form from "./form";
import FormSubmitButton from "./FormSubmitButton";
import Input from "./input";
import Select from "./Select";
import { signupSchema } from "../schemas/auth/signupSchema";
import UserContext from "../contexts/userContext";
import initializeUserData from "../lib/auth/initializeUserData";
import initializeStripeUser from "../lib/stripe/initializeStripeUser";
import { doc, setDoc } from "firebase/firestore";

export default function SignupForm({ redirectTo }) {
  const { user } = useContext(UserContext);
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

    if (user && user.isAnonymous) {
      const credential = EmailAuthProvider.credential(email, password);
      linkWithCredential(user, credential)
        .then(async (userCredential) => {
          const { uid } = userCredential.user;
          // Create stripe user association
          const stripeCustomerId = await initializeStripeUser(
            firstName,
            lastName,
            email,
            uid
          );
          // Update user firestore data with new information
          // firestore user document data base already created when anonymously signed in.
          await setDoc(
            doc(db, "users", uid),
            {
              firstName,
              lastName,
              gender,
              stripeCustomerId,
            },
            { merge: true }
          );
          if (redirectTo) {
            router.push(redirectTo);
          } else {
            router.push("/");
          }
        })
        .catch((e) => seterror(e.message));
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const { uid } = userCredential.user;
          // 1. Create stripe user association
          const stripeCustomerId = await initializeStripeUser(
            firstName,
            lastName,
            email,
            uid
          );
          // 2. Create firestore user document
          await initializeUserData(
            uid,
            firstName,
            lastName,
            gender,
            email,
            stripeCustomerId
          );
        })
        .catch((e) => seterror(e.message));
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push("/");
      }
    }
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
