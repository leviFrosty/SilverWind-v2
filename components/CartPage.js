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

export default function CartPage({ user }) {
  const [userCart, setuserCart] = useState([]);
  const [productList, setProductList] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(async () => {
    // user cart / products listener
    let unsubscribeProducts = {};
    const unsubscribeUserData = onSnapshot(
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
          });
        }
      }
    );
    return () => {
      unsubscribeUserData();
      unsubscribeProducts();
    };
  }, []);

  const handleTotalPrice = () => {
    let totalCost = 0;
    productList.forEach((product) => {
      const item = userCart.filter((item) => item.id == product.id)[0];
      const productTotalCost = product.price * item.quantity;
      totalCost = totalCost + productTotalCost;
    });
    setTotal(totalCost);
  };

  useEffect(() => {
    handleTotalPrice();
  }, [userCart, productList]);

  return (
    <>
      <Head>{siteTitlePrefix} Cart</Head>
      <Container>
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
                <span>{total}</span>
              </div>
              <div className="flex justify-center md:justify-end md:mx-4">
                <button className="flex bg-violet-500 text-center mx-2 py-2 px-10 font-extrabold text-white rounded-lg hover:bg-violet-600 active:bg-violet-600 transition-color cursor-pointer">
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
      </Container>
    </>
  );
}
