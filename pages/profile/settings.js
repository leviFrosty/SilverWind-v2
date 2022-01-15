import { doc, setDoc } from "firebase/firestore";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import CenterTitle from "../../components/CenterTitle";
import Form from "../../components/form";
import Input from "../../components/input";
import Layout, { siteTitlePrefix } from "../../components/layout";
import ProfileLayout from "../../components/ProfileLayout";
import UserContext from "../../contexts/userContext";
import { db } from "../../lib/fbInstance";
import getUserData from "../../lib/getUserData";

export default function Settings() {
  const { user } = useContext(UserContext);
  const [userData, setuserData] = useState({});
  const [email, setemail] = useState("");
  const [error, seterror] = useState("");

  const fetchuserData = async () => {
    await getUserData(user.uid)
      .then((data) => {
        setuserData(data);
        setemail(data.email);
      })
      .catch((e) => console.log(e));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await setDoc(doc(db, "users", user.uid), { email }, { merge: true });
  };

  useEffect(() => {
    if (user) fetchuserData();
  }, [user]);

  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Settings</title>
        <meta
          name="description"
          content="Change your SilverWind profile settings."
        />
      </Head>
      <ProfileLayout>
        <CenterTitle>Settings</CenterTitle>
        <div className="px-2">
          <Form onSubmit={handleSubmit} error={error}>
            <h3 className="text-lg text-violet-900">Full Name</h3>
            <p>{`${userData.firstName} ${userData.lastName}`}</p>
            <h3 className="mt-2 text-lg text-violet-900">Email</h3>
            <Input
              name="email"
              type="text"
              value={email}
              setState={setemail}
            ></Input>
            <button
              className="my-4 bg-violet-900 px-auto w-full text-white hover:bg-violet-500 active:bg-violet-500 py-2 rounded-md"
              type="submit"
            >
              Save
            </button>
          </Form>
        </div>
      </ProfileLayout>
    </Layout>
  );
}
