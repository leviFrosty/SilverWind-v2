import Link from "next/link";
import React, { useContext } from "react";
import UserContext from "../contexts/userContext";
import Bars from "../public/icons/bars-solid.svg";
import ShoppingBasket from "../public/icons/shopping-basket-solid.svg";
import ProfileIcon from "../public/icons/profile-icon.svg";

export default function Nav() {
  const user = useContext(UserContext);

  return (
    <nav className="flex flex-col rounded-b-md bg-white shadow-md md:shadow-none p-4 text-violet-900 md:flex-row md:justify-between md:px-10 max-w-screen-lg mx-auto md:sticky z-10">
      <div className="flex items-center mb-4 md:mb-0">
        <Link href="/">
          <a className="mx-auto font-bold text-2xl">SilverWind</a>
        </Link>
        <Bars
          width={25}
          height={25}
          className="md:invisible hover:text-violet-500 transition-colors "
        />
      </div>
      <div className="flex flex-col md:gap-10 md:flex-row">
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-center">
          <Link href="/about">
            <a>about us</a>
          </Link>
          <Link href="/portfolio">
            <a>portfolio</a>
          </Link>
          <Link href="/about">
            <a>categories</a>
          </Link>
          <Link href="/products/rings">
            <a>rings</a>
          </Link>
          <Link href="/products/necklaces">
            <a>necklaces</a>
          </Link>
          <Link href="/products/earrings">
            <a>earrings</a>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0 items-center">
          <Link href="/cart">
            {/* TODO: Add navbar toggling.  */}
            <a class="flex flex-row bg-violet-500 md:bg-inherit shadow-md md:shadow-none transition-color rounded-md px-3 py-2 md:py-1 text-white md:text-violet-500 gap-2 justify-center hover:bg-violet-800 hover:text-white ">
              <ProfileIcon className="w-5" alt="Profile" />
            </a>
          </Link>
          <Link href="/cart">
            <a class="flex flex-row align-middle bg-violet-500 shadow-md rounded-md transition-color px-3 py-2 md:py-1 text-white gap-2 justify-center hover:bg-violet-700  ">
              <ShoppingBasket className="w-5" alt="Cart" />
            </a>
          </Link>
        </div>
      </div>
      {user ? user.email : null}
    </nav>
  );
}
