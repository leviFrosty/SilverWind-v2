import Plus from "../public/icons/plus-solid.svg";
import Minus from "../public/icons/minus-solid.svg";
import { useRouter } from "next/router";
import { addToCart } from "../lib/addToCart";
import Image from "next/image";

export default function CartCard({ product, quantity, user }) {
  const router = useRouter();

  const increaseAmt = () => {
    addToCart(user.uid, product.id, 1);
  };

  const decreaseAmt = () => {
    if (quantity === 1) return;
    addToCart(user.uid, product.id, -1);
  };

  return (
    <article className="flex justify-between flex-row relative bg-white rounded-lg overflow-hidden p-3 mx-2 md:mx-4 my-2">
      <div className="w-32 md:h-32 md:w-40 relative rounded-lg">
        <Image
          src={product.coverPhotoURL}
          layout="fill"
          className="object-contain rounded-lg overflow-hidden"
          alt=""
          onClick={() => router.push(`/products/${product.id}`)}
        />
      </div>
      <div className="flex gap-2 md:gap-8 relative items-center">
        <h2 className="text-center text-violet-900 text-xl md:font-semibold">
          {product.name}
        </h2>
      </div>
      <div className="flex flex-row md:gap-6 items-center">
        <div className="flex flex-col items-center gap-2 justify-center">
          <Plus
            className="w-4 h-4 mx-2 active:w-5 active:h-5 text-violet-300"
            onClick={() => {
              increaseAmt();
            }}
          />
          <span>{quantity}</span>
          <Minus
            className="w-4 h-4 mx-2 active:w-5 active:h-5 transition-all text-violet-300"
            onClick={() => decreaseAmt()}
          />
        </div>
        <div>
          <p className="font-bold text-violet-900">${product.price}</p>
        </div>
      </div>
    </article>
  );
}
