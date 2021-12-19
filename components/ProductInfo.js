import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/userContext";
import { formatItemQuantity } from "../lib/formatItemQuantity";
import Hammer from "../public/icons/hammer-solid.svg";
import Ingots from "../public/icons/bars-hallow.svg";
import Recycle from "../public/icons/recycle-solid.svg";
import Plane from "../public/icons/plane-departure-solid.svg";
import Redo from "../public/icons/redo-alt-solid.svg";
import Basket from "../public/icons/shopping-basket-solid.svg";
import Truck from "../public/icons/truck-solid.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/fbInstance";

export default function ProductInfo({ product }) {
  const [quantityText, setquantityText] = useState("");
  const [addedToCart, setAddedToCart] = useState(false)
  const router = useRouter();
  const user = useContext(UserContext);


  // const validateCartAdd = () => {
  //   if (user.uid === undefined) {
  //     router.push("/login");
  //   } else {
  //     console.log("add to cart button clicked");
  //     addToUserCart(product.id);
  //   }
  // };

  const addToCart = async () => {
    if (!user) return router.push("/login");
    await setDoc(doc(db, "users", user.uid), { cart: {id: product.id, quantity: 1}}, {merge: true}).catch(e => console.log(e));
    setAddedToCart(true)
    return console.log("added to cart!");
  };

  // const addToUserCart = async (id) => {
  //   console.log("adding to user cart");
  //   const userDoc = await getDoc(doc(db, "users", user.uid));
  //   const currentCart = userDoc.data().cart;
  //   await updateDoc(doc(db, "users", user.uid), {
  //     cart: [{ id, quantity: 1 }, ...currentCart],
  //   });
  // };

  useEffect(() => {
    formatItemQuantity(product, setquantityText);
  }, []);

  return (
    <div className="flex flex-col max-w-xl">
      <div className="flex flex-row justify-between border-b-2 border-b-violet-100 px-2 py-3">
        <span className="text-violet-900 text-2xl font-bold">{`$${product.price}`}</span>
        <span className="flex flex-row gap-1 text-violet-900 text-2xl min-w-fit">
          {quantityText}
        </span>
      </div>
      <div className="flex flex-col-reverse my-3">
        <Link href="/return-policy">
          <a className="text-violet-300 m-0 text-sm">
            *Shipping and return policies
          </a>
        </Link>
        <button
          onClick={addToCart}
          className=" mx-2 cursor-pointer bg-violet-900 text-white rounded-md px-3 py-3 hover:bg-violet-500 font-bold focus:bg-violet-500 "
        >
          {addedToCart ? `Added to cart!` : `Add to cart`}
        </button>
      </div>
      <div className="flex flex-col bg-violet-100 rounded-md mx-2 my-3 px-10 py-3 gap-4">
        <h2 className="mx-auto text-xl font-bold text-violet-900">Details:</h2>
        <span className="flex flex-row text-violet-900 gap-2 align-middle">
          <Hammer className="h-8" />
          Handmade in Fort Thomas, KY USA
        </span>
        <span className="flex flex-row text-violet-900 gap-2 align-middle">
          <Ingots className="h-6" />
          {product.material}
        </span>
        <span className="flex flex-row text-violet-900 gap-2 align-middle">
          <Recycle className="h-8" />
          Sustainably Sourced Recycled Materials
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 text-violet-500 my-8 mx-2">
        <span className="flex flex-row gap-1 justify-center text-sm">
          <Plane className="w-5" />
          Internation Shipping*
        </span>
        <span className="flex flex-row gap-1 justify-center text-sm">
          <Redo className="w-5" />
          Returns Available
        </span>
        <span className="flex flex-row gap-1 justify-center text-sm">
          <Basket className="w-5" />
          Free standard over $40
        </span>
        <span className="flex flex-row gap-1 justify-center text-sm">
          <Truck className="w-5" />
          Free express over $120
        </span>
      </div>
      <div className="product-description">
        <p className="text-violet-900 mx-6 my-4 leading-7">
          {product.description}
        </p>
      </div>
    </div>
  );
}
