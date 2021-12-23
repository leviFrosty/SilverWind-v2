import Head from "next/head";
import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { siteTitlePrefix } from "./layout";
import Container from "./Container";
import CenterTitle from "./CenterTitle";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../lib/fbInstance";
import CartCard from "../components/CartCard";
import Link from "next/link";
import getStripe from "../lib/getStripe";
import axios from "axios";
import SpinnerFullScreen from "./SpinnerFullScreen";

export default function CartPage({ user }) {
  const [userCart, setuserCart] = useState([]);
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let unsubscribeProducts = {};
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
    const stripeCartList = userCart.map((cartItem) => {
      const product = productList.find((product) => product.id === cartItem.id);
      return { quantity: cartItem.quantity, price: product.priceId };
    });

    const {
      data: { id },
    } = await axios.post("/api/stripe/checkout_session", {
      items: stripeCartList,
    });
    const stripe = await getStripe();
    await stripe.redirectToCheckout({ sessionId: id });
  };

  const handleTotalPrice = () => {
    let totalCost = 0;
    productList.forEach((product) => {
      const item = userCart.filter((item) => item.id == product.id)[0];
      const productTotalCost = product.price * item.quantity;
      totalCost = totalCost + productTotalCost;
    });
    setTotal(totalCost.toFixed(2));
  };

  useEffect(() => {
    handleTotalPrice();
  }, [userCart, productList]);

  return (
    <>
      <Head>{siteTitlePrefix} Cart</Head>
      <Container>
        {!isLoading ? (
          <div className="bg-violet-100 relative rounded-b-2xl shadow-md pb-4">
            <CenterTitle>Cart</CenterTitle>
            {productList.length > 0 ? (
              <>
                {productList.map((product) => {
                  const userCartItem = userCart.filter(
                    (cartItems) => cartItems.id == product.id
                  );
                  return (
                    <CartCard
                      key={product.id}
                      product={product}
                      user={user}
                      quantity={userCartItem[0].quantity}
                    />
                  );
                })}
                <div className="flex justify-end gap-1 text-violet-300 py-2 mx-2 md:mx-6 md:my-6 ">
                  <span>Subtotal:</span>
                  <span>${total}</span>
                </div>
                <div className="flex justify-center md:justify-end md:mx-4">
                  <button
                    onClick={() => handleCheckout()}
                    className="flex bg-violet-500 text-center my-3 mx-2 py-2 px-10 font-extrabold text-white rounded-lg hover:bg-violet-600 active:bg-violet-600 transition-color cursor-pointer"
                  >
                    Checkout
                  </button>
                </div>
              </>
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
    </>
  );
}
