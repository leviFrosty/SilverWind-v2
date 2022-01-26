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
import Plus from "../public/icons/plus-solid.svg";
import Minus from "../public/icons/minus-solid.svg";
import Gem from "../public/icons/gem-solid.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { addToCart } from "../lib/addToCart";
import {
  FREE_STANDARD_SHIPPING_ORDER_MIN,
  FREE_EXPRESS_SHIPPING_ORDER_MIN,
  RINGS,
  RING_SIZES,
} from "../lib/PRODUCT_KEYS";
import Select from "./Select";
import Form from "./form";
import Input from "./input";

export default function ProductInfo({ product }) {
  const [quantityText, setquantityText] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedQuantity, setAddedQuantity] = useState(0);
  const [options, setoptions] = useState({});
  const [toAdd, setToAdd] = useState(1);
  const router = useRouter();
  const { user } = useContext(UserContext);

  const handleAddToCart = async () => {
    if (!user) {
      router.push({
        pathname: "/login",
        query: { redirectTo: window.location.href },
      });
      return;
    }
    if (
      product.category === RINGS &&
      (options.size == "" || options.size == undefined)
    )
      return;
    setAddedQuantity(addedQuantity + toAdd);
    addToCart(user.uid, product.id, toAdd, setAddedToCart, options).catch((e) =>
      console.log(e)
    );
  };

  const setsize = (size) => {
    const obj = { ...options };
    obj.size = size;
    setoptions(obj);
  };
  const setcustomization = (customization) => {
    const obj = { ...options };
    obj.customization = customization;
    setoptions(obj);
  };

  useEffect(() => {
    formatItemQuantity(product, setquantityText);
  }, []);

  return (
    <div className="flex flex-col max-w-xl">
      <div className="flex flex-row justify-between border-b-2 border-b-violet-100 px-2 py-3">
        <span className="text-violet-900 text-2xl font-bold">{`$${product.price}`}</span>
        <span className="flex flex-row gap-1 text-violet-900 text-2xl min-w-fit items-center">
          {quantityText}
        </span>
      </div>
      <div className="flex flex-col px-2 my-3">
        <button
          type={product.category === RINGS ? "submit" : "button"}
          form="optionsForm"
          onClick={handleAddToCart}
          className="relative flex flex-row cursor-pointer bg-violet-500 text-white rounded-md px-3 py-2 hover:bg-violet-600 font-bold active:bg-violet-700 items-center"
        >
          <p className="flex-grow hover:font-semibold active:font-semibold">
            {addedToCart
              ? `Added to cart! 🎉 +${addedQuantity}`
              : `Add to cart`}
          </p>
          <div className="relative bottom-0 flex items-center bg-violet-800 rounded-md p-1">
            <Plus
              className="w-4 h-4 mx-2 active:w-5 active:h-5"
              onClick={(e) => {
                e.stopPropagation();
                setToAdd(toAdd + 1);
              }}
            />
            <span>{toAdd}</span>
            <Minus
              className="w-4 h-4 mx-2 active:w-5 active:h-5 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                if (toAdd > 1) setToAdd(toAdd - 1);
              }}
            />
          </div>
        </button>
        <Link href="/return-policy">
          <a className="text-violet-300 m-0 text-sm">
            *Shipping and return policies
          </a>
        </Link>
        {product.category === RINGS || product.customizable ? (
          <Form
            id="optionsForm"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {product.category === RINGS ? (
              <Select
                id="ringSize"
                title="Ring Size"
                required
                value={options.size}
                setState={setsize}
              >
                <option value="">-- Select Ring Size --</option>
                {RING_SIZES.map((size, index) => (
                  <option key={index}>{size}</option>
                ))}
              </Select>
            ) : null}
            {product.customizable ? (
              <Input
                name="customization"
                title="Customization"
                type="text"
                value={options.customization}
                setState={setcustomization}
              />
            ) : null}
          </Form>
        ) : null}
      </div>
      <div className="flex flex-col bg-violet-100 rounded-md mx-2 my-3 px-10 py-3 gap-4">
        <h2 className="mx-auto text-xl font-bold text-violet-900">Details:</h2>
        <span className="flex flex-row text-violet-900 gap-2 items-center">
          <Hammer className="h-5" />
          Handmade in Fort Thomas, KY USA
        </span>
        <span className="flex flex-row text-violet-900 gap-2 items-center">
          <Ingots className="h-5" />
          {product.material}
        </span>
        {product.stone ? (
          <span className="flex flex-row text-violet-900 gap-2 items-center">
            <Gem className="h-5" />
            {product.stone}
          </span>
        ) : null}
        <span className="flex flex-row text-violet-900 gap-2 items-center">
          <Recycle className="h-5" />
          Sustainably Sourced Recycled Materials
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 text-violet-500 my-8 mx-2 items-center">
        <div className="flex flex-row gap-2 justify-center text-sm items-center">
          <Plane className="w-5 h-5" />
          Internation Shipping*
        </div>
        <div className="flex flex-row gap-2 justify-center text-sm items-center">
          <Redo className="w-5 h-5" />
          Returns Available
        </div>
        <div className="flex flex-row gap-2 justify-center text-sm items-center">
          <Basket className="w-5 h-5" />
          Free standard over ${FREE_STANDARD_SHIPPING_ORDER_MIN * 0.01}
        </div>
        <div className="flex flex-row gap-2 justify-center text-sm items-center">
          <Truck className="w-5 h-5" />
          Free express over ${FREE_EXPRESS_SHIPPING_ORDER_MIN * 0.01}
        </div>
      </div>
      <div className="product-description">
        <p className="text-violet-900 mx-6 my-4 leading-7 whitespace-pre-wrap">
          {product.description}
        </p>
      </div>
    </div>
  );
}
