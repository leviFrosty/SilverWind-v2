import React, { useEffect, useState } from "react";
import { formatItemQuantity } from "../lib/formatItemQuantity";
import Hammer from "../public/icons/hammer-solid.svg";
import Ingots from "../public/icons/bars-hallow.svg";
import Recycle from "../public/icons/recycle-solid.svg";
import Plane from "../public/icons/plane-departure-solid.svg";
import Redo from "../public/icons/redo-solid.svg";
import Basket from "../public/icons/shopping-basket-solid.svg";
import Truck from "../public/icons/truck-solid.svg";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ProductInfo({ product }) {
  const [quantityText, setquantityText] = useState("");
  const router = useRouter();

  const validateCartAdd = () => {
    if (user.uid === undefined) {
      router.push("/login");
    } else {
      console.log("add to cart button clicked");
      addToUserCart(product.id);
    }
  };

  const addToUserCart = async (id) => {
    console.log("adding to user cart");
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const currentCart = userDoc.data().cart;
    await updateDoc(doc(db, "users", user.uid), {
      cart: [{ id, quantity: 1 }, ...currentCart],
    });
  };

  useEffect(() => {
    formatItemQuantity(product, setquantityText);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row border-b-2 border-b-violet-100">
        <span className="text-violet-900 text-lg font-semibold">{`$${product.price}`}</span>
        <span className="flex flex-row justify-around gap-10 text-violet-900 text-md min-w-fit">
          {quantityText}
        </span>
      </div>
      <div className="product-highlights">
        <span className="product__handmade">
          <Hammer />
          Handmade in Fort Thomas, KY USA
        </span>
        <span>
          <Ingots />
          {product.material}
        </span>
        <span>
          <Recycle />
          Sustainably Sourced Recycled Materials
        </span>
      </div>
      <div className="product-cta">
        <Link href="/return-policy">
          <a>*Shipping and return policies</a>
        </Link>
        <button onClick={validateCartAdd} className="button-secondary">
          Add to cart
        </button>
      </div>
      <div className="product-logistics">
        <span>
          <Plane />
          Internation Shipping*
        </span>
        <span>
          <Redo />
          Returns Available
        </span>
        <span>
          <Basket />
          Free standard over $40
        </span>
        <span>
          <Truck />
          Free express over $120
        </span>
      </div>
      <div className="product-description">
        <p>{product.description}</p>
      </div>
    </div>
  );
}
