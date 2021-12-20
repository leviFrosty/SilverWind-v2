import Plus from "../public/icons/plus-solid.svg";
import Minus from "../public/icons/minus-solid.svg";
import { useRouter } from "next/router";

export default function CartCard({ product, quantity, user }) {
  console.log("Cart Card:", product.id);
  const router = useRouter();

  const increaseAmt = () => {
    // take quantity (which was fetched from userdata)
    // format the product obj to replace existing data
    // merge product obj into existing user data, retaining only the
    // TODO: CHECK OUT THE ProductInfo.js file for the function. Abstract / refactor
    console.log("increasing amt");
  };

  const decreaseAmt = () => {
    console.log("decreasing amt");
  };

  return (
    <article className="flex justify-between flex-row relative bg-white rounded-lg overflow-hidden p-3 mx-2 md:mx-4 my-2">
      <div className="flex md:gap-8 relative items-center">
        <img
          src={product.coverPhotoURL}
          className="w-32 h-full object-contain rounded-lg"
          alt=""
          onClick={() => router.push(`/products/${product.id}`)}
        />
        <h2 className="text-center text-violet-900 text-xl md:font-semibold">{product.name}</h2>
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
