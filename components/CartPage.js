import Head from "next/head";
import React, { useState, useEffect } from "react";
import { siteTitlePrefix } from "./layout";
import Container from "./Container";
import CenterTitle from "./CenterTitle";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../lib/fbInstance";
import CartCard from "../components/CartCard";
import Link from "next/link";
import getStripe from "../lib/getStripe";
import axios from "axios";
import SpinnerFullScreen from "./SpinnerFullScreen";
import Spinner from "./Spinner";
import getUserData from "../lib/getUserData";
import Stripe from "../public/icons/stripe-brands.svg";
import Lock from "../public/icons/lock-solid.svg";

export default function CartPage({ user }) {
  const [userCart, setuserCart] = useState([]);
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCheckout, setisLoadingCheckout] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, seterror] = useState("");
  let unsubscribeProducts = () => {};

  useEffect(() => {
    let unsubscribeUserData;
    async function getProductList() {
      // user cart / products listener
      unsubscribeUserData = onSnapshot(
        doc(db, "users", user.uid),
        (userData) => {
          const cartData = userData.data().cart;
          setuserCart(cartData);
          const productIds = cartData.map((item, index) => {
            return cartData[index].id;
          });
          if (productIds.length !== 0) {
            const collectionRef = collection(db, "products");
            let q = query(collectionRef, where("id", "in", productIds));
            unsubscribeProducts = onSnapshot(q, (querySnapshot) => {
              const products = [];
              querySnapshot.forEach((doc) => products.push(doc.data()));
              setProductList(products);
              setIsLoading(false);
            });
          } else {
            setProductList([]);
            setIsLoading(false);
          }
        }
      );
    }

    getProductList();

    return () => {
      unsubscribeUserData();
      unsubscribeProducts();
    };
  }, []);

  const handleCheckout = async () => {
    setisLoadingCheckout(true);
    const stripeCartList = userCart.map((cartItem) => {
      let descriptionString;
      const keys = Object.keys(cartItem.options);
      if (keys.length !== 0) {
        let tempString = "";
        descriptionString = keys.forEach((key) => {
          if (tempString == "")
            return (tempString = `${key.toUpperCase()}: ${
              cartItem.options[key]
            }`);
          tempString += `, ${key.toUpperCase()}: ${cartItem.options[key]}`;
        });
        descriptionString = tempString;
      }
      const product = productList.find((product) => product.id === cartItem.id);
      if (!descriptionString) {
        return { quantity: cartItem.quantity, price: product.priceId };
      }
      return {
        quantity: cartItem.quantity,
        price: product.priceId,
        description: descriptionString,
      };
    });
    let stripeCustomerId;
    await getUserData(user.uid).then(
      (res) => (stripeCustomerId = res.stripeCustomerId)
    );

    const {
      data: { id },
    } = await axios.post("/api/stripe/checkout_session", {
      items: stripeCartList,
      stripeCustomerId: stripeCustomerId,
    });
    const stripe = await getStripe();
    await stripe.redirectToCheckout({ sessionId: id });
  };

  const handleTotalPrice = () => {
    let totalCost = 0;
    if (userCart.length == 0) return;
    if (userCart.length !== productList.length) return;
    for (const cartEntry of userCart) {
      const product = productList.filter(
        (product) => cartEntry.id == product.id
      );
      const entryTotal = cartEntry.quantity * product[0].price;
      totalCost += entryTotal;
    }
    setTotal(totalCost.toFixed(2));
  };

  useEffect(() => {
    handleTotalPrice();
  }, [productList]);

  return (
    <React.Fragment>
      <Head>{siteTitlePrefix} Cart</Head>
      <Container>
        {!isLoading ? (
          <div className="bg-violet-100 relative rounded-b-2xl shadow-md pb-4">
            <CenterTitle>Cart</CenterTitle>
            {userCart.length > 0 ? (
              <React.Fragment>
                {userCart.map((cartItem) => (
                  <CartCard
                    key={cartItem.cartEntryId}
                    cartItem={cartItem}
                    user={user}
                    seterror={seterror}
                  />
                ))}
                {error ? (
                  <div className="flex justify-end text-red-500 py-2 mx-2 md:mx-6 md:my-6">
                    {error}
                  </div>
                ) : null}
                <div className="flex justify-end gap-1 text-violet-300 py-2 mx-2 md:mx-6 md:my-6 ">
                  <span>Subtotal:</span>
                  <span>${total}</span>
                </div>
                <div className="flex justify-center md:justify-end md:mx-4">
                  <div className="flex flex-col gap-4 md:gap-2 mt-8 md:mt-2">
                    <button
                      onClick={() => handleCheckout()}
                      className="flex bg-violet-500 text-center py-2 px-10 font-extrabold text-white rounded-lg hover:bg-violet-600 active:bg-violet-600 transition-color cursor-pointer"
                    >
                      {isLoadingCheckout ? (
                        <Spinner className="text-white" />
                      ) : (
                        "Checkout"
                      )}
                    </button>
                    <div>
                      <a
                        className="flex flex-row items-center justify-center md:justify-start gap-1 text-violet-300 text-sm"
                        href="https://stripe.com/docs/security/stripe"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Lock className="h-4" />
                        Secured by <Stripe className="h-8" />
                      </a>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <div className="h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-center text-2xl text-violet-900 my-6">
                  Nothing here! 😔
                </h2>
                <Link href="/products">
                  <a className="text-center bg-violet-500 text-white rounded-md px-3 py-2 mx-4">
                    View products
                  </a>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <SpinnerFullScreen />
        )}
      </Container>
    </React.Fragment>
  );
}
