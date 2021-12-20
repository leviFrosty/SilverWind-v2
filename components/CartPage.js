import Head from "next/head";
import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { siteTitlePrefix } from "./layout";
import Container from "./Container";
import CenterTitle from "./CenterTitle";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../lib/fbInstance";
import CartCard from "../components/CartCard";

export default function CartPage({ user }) {
  const [cartProductIds, setcartProductIds] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(async () => {
    // user cart / products listener
    let unsubscribeProducts = {};
    const unsubscribeUserData = onSnapshot(
      doc(db, "users", user.uid),
      (userData) => {
        const cartData = userData.data().cart;
        const newList = cartData.map((item, index) => {
          return cartData[index].id;
        });
        setcartProductIds(newList);
        if (newList.length !== 0) {
          const collectionRef = collection(db, "products");
          let q = query(collectionRef, where("id", "in", newList));
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
  return (
    <>
      <Head>{siteTitlePrefix} Cart</Head>
      <Container>
        <CenterTitle>Cart</CenterTitle>
        {productList.map((product) => (
          <h1 key={product.id}>{product.name}</h1>
        ))}
      </Container>
    </>
  );
}
