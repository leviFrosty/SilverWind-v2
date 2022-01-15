import axios from "axios";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import CenterTitle from "../../components/CenterTitle";
import Layout, { siteTitlePrefix } from "../../components/layout";
import OrderCheckoutSessionCard from "../../components/OrderCheckoutSessionCard";
import ProfileLayout from "../../components/ProfileLayout";
import UserContext from "../../contexts/userContext";
import getUserData from "../../lib/getUserData";

export default function Orders() {
  const { user } = useContext(UserContext);
  const [checkoutSessions, setcheckoutSessions] = useState([]);
  const [isloading, setisloading] = useState(true);
  const getPaymentIntents = async () => {
    await getUserData(user.uid).then(async (data) => {
      await axios
        .post("/api/stripe/get-customer-orders", {
          customer_id: data.stripeCustomerId,
        })
        .then((res) => {
          setisloading(false);
          setcheckoutSessions(res.data);
        })
        .catch((e) => {
          setisloading(false);
          console.log(e);
        });
    });
  };

  useEffect(() => {
    if (user) getPaymentIntents();
  }, [user]);

  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Orders</title>
        <meta
          name="description"
          content="Follow previous orders and see your SilverWind order details."
        />
      </Head>
      <ProfileLayout>
        <CenterTitle>Orders</CenterTitle>
        <div className="flex flex-col gap-2 justify-center items-center">
          {!isloading
            ? checkoutSessions.map((checkoutSession) => {
                return (
                  <OrderCheckoutSessionCard
                    key={checkoutSession.data[0].id}
                    checkoutSession={checkoutSession.data[0]}
                  />
                );
              })
            : "Loading..."}
          {!isloading && checkoutSessions.length === 0 ? (
            <p>No orders! 😰</p>
          ) : null}
        </div>
      </ProfileLayout>
    </Layout>
  );
}
