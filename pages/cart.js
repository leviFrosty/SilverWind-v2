import { useContext, useEffect, useState } from "react";
import CenterTitle from "../components/CenterTitle";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import UserContext from "../contexts/userContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/fbInstance";
import CartCard from "../components/CartCard";

export default function Cart() {
  const user = useContext(UserContext);
  const router = useRouter();
  const [cartProducts, setcartProducts] = useState([]);
  const [userCart, setUserCart] = useState([]);
  
  useEffect(async () => {
    if (!user) return router.replace("/login");
    const ref = await doc(db, "users", user.uid);
    const { cart } = await (await getDoc(ref)).data();
    let arr = [];
    cart.forEach(async (item) =>
      arr.push(await (await getDoc(doc(db, "products", item.id))).data())
    );
    setcartProducts(arr);
  }, []);

  return (
    <Layout>
      <CenterTitle>Cart</CenterTitle>
      {cartProducts.map((product) => (
        <CartCard key={product.id} product={product} />
      ))}
    </Layout>
  );
}
