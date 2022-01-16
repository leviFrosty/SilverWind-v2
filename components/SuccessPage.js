import { doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { db } from "../lib/fbInstance";
import CenterTitle from "./CenterTitle";

export default function SuccessPage({ user, session_id }) {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(
    () => `api/checkout_session/${session_id}`,
    fetcher
  );
  useEffect(() => {
    async function clearCart() {
      const ref = await doc(db, "users", user.uid);
      await setDoc(ref, { cart: [] }, { merge: true }).catch((e) =>
        console.log(e)
      );
    }
    clearCart();
  }, [data]);

  return (
    <React.Fragment>
      <div className="flex flex-col text-center h-[68vh] justify-center px-8">
        <CenterTitle>Success!✨</CenterTitle>
        <p className="text-center text-violet-900">
          Your order has been recieved. You will recieve an email receipt
          shortly.
        </p>
      </div>
      <div className="text-center my-8 px-8">
        <p className="text-violet-900 text-xl">Have a problem?</p>
        <Link href="/contact">
          <a className="decoration-violet-400 decoration-solid decoration-2 underline-offset-1 underline font-bold text-md text-violet-900">
            Contact Us.
          </a>
        </Link>
      </div>
    </React.Fragment>
  );
}
