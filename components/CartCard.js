import Plus from "../public/icons/plus-solid.svg";
import Minus from "../public/icons/minus-solid.svg";
import removeFromCart from "../lib/removeFromCart";
import { useRouter } from "next/router";
import { addToCart } from "../lib/addToCart";
import Image from "next/image";
import Times from "../public/icons/times-solid.svg";
import { useState, useEffect } from "react";
import getProduct from "../lib/getProduct";
export default function CartCard({ user, cartItem, seterror }) {
  const [options, setoptions] = useState([]);
  const [product, setproduct] = useState({});
  const router = useRouter();

  useEffect(() => {
    getProduct(cartItem.id).then((res) => setproduct(res.data()));
    const keys = Object.keys(cartItem.options);
    if (keys.length == 0) return;
    const formattedOptions = keys.map(
      (key) =>
        `${key.charAt(0).toUpperCase() + key.slice(1)}: ${
          cartItem.options[key]
        }`
    );
    setoptions(formattedOptions);
  }, []);

  const increaseAmt = () => {
    addToCart(user.uid, cartItem.id, 1, {}, cartItem.options).catch((e) =>
      seterror(e.message)
    );
  };

  const decreaseAmt = () => {
    if (cartItem.quantity === 1) return;
    addToCart(user.uid, cartItem.id, -1, {}, cartItem.options).catch((e) =>
      seterror(e.message)
    );
  };

  return (
    <article className="flex justify-between flex-row relative bg-white rounded-lg overflow-hidden p-3 mx-2 md:mx-4 my-2 shadow-sm">
      <div className="w-32 md:h-32 md:w-40 relative rounded-lg">
        {product.coverPhotoURL ? (
          <Image
            src={product.coverPhotoURL}
            layout="fill"
            priority
            className="object-contain rounded-lg overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform"
            alt=""
            onClick={() => router.push(`/products/${product.id}`)}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="flex flex-col md:flex-row w-full gap-2 md:gap-8 relative items-center">
        <div className="md:ml-10">
          <h2
            onClick={() => router.push(`/products/${product.id}`)}
            className="text-center text-violet-900 text-xl md:font-semibold cursor-pointer hover:decoration-2 hover:underline hover:decoration-violet-400"
          >
            {product.name}
          </h2>
        </div>
        {options.length > 0 ? (
          <div className="text-violet-900 opacity-60 text-sm flex-grow">
            {options.map((option) => (
              <p className="break-all" key={option}>
                {option}
              </p>
            ))}
          </div>
        ) : null}
      </div>
      <div className="flex flex-row md:gap-6 items-center">
        <div className="flex flex-col items-center gap-2 justify-center">
          <Plus
            className="cursor-pointer w-4 h-4 mx-2 active:w-5 active:h-5 text-violet-300 hover:text-violet-500"
            onClick={() => {
              increaseAmt();
            }}
          />
          <span className="select-none">{cartItem.quantity}</span>
          <Minus
            className="cursor-pointer w-4 h-4 mx-2 active:w-5 active:h-5 transition-all text-violet-300 hover:text-violet-500"
            onClick={() => decreaseAmt()}
          />
        </div>
        <div className="font-bold text-violet-900 text-md flex flex-row gap-2 items-center">
          <p className="select-none">${product.price}</p>
          <Times
            className="cursor-pointer w-4 h-4 opacity-25 hover:opacity-80"
            onClick={() => removeFromCart(user.uid, cartItem.cartEntryId)}
          />
        </div>
      </div>
    </article>
  );
}
