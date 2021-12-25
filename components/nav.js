import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/userContext";
import Bars from "../public/icons/bars-solid.svg";
import ShoppingBasket from "../public/icons/shopping-basket-solid.svg";
import ProfileIcon from "../public/icons/profile-icon.svg";
import NavLink from "./NavLink";

export default function Nav() {
  const [isCollapsed, setCollapsed] = useState(true);
  const { user } = useContext(UserContext);

  const onWindowResize = () => {
    let viewport_width = window.innerWidth;
    if (viewport_width > 768 && isCollapsed == true) {
      setCollapsed(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth > 768) setCollapsed(false);
    window.addEventListener("resize", onWindowResize);
    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  return (
    <nav className="flex flex-col rounded-b-md bg-white shadow-md md:shadow-none px-4 py-2 text-violet-900 md:flex-row md:justify-between w-full md:px-4 lg:px-16 sticky top-0">
      <div className="flex items-center md:mb-0">
        <Link href="/">
          <a className="mx-auto font-bold text-2xl text-violet-500 hover:text-violet-900">
            SilverWind
          </a>
        </Link>
        <Bars
          onClick={() => setCollapsed(!isCollapsed)}
          width={25}
          height={25}
          className="md:invisible hover:text-violet-500 transition-colors cursor-pointer active:text-violet-900 active:bg-violet-200"
        />
      </div>
      {!isCollapsed ? (
        <React.Fragment>
          <div className="nav-collapsable flex flex-col md:flex-row gap-3 md:gap-5 my-4 items-center">
            <NavLink
              href="/about"
              exact
              className="hover:bg-violet-100 hover:rounded-md px-2 py-1 focus:bg-violet-200 transition-all"
            >
              about us
            </NavLink>
            <NavLink
              href="/portfolio"
              exact
              className="hover:bg-violet-100 hover:rounded-md px-2 py-1 focus:bg-violet-200 transition-all"
            >
              portfolio
            </NavLink>
            <NavLink
              href="/products"
              exact
              className="hover:bg-violet-100 hover:rounded-md px-2 py-1 focus:bg-violet-200 transition-all"
            >
              products
            </NavLink>
            <NavLink
              href="/products/rings"
              exact
              className="hover:bg-violet-100 hover:rounded-md px-2 py-1 focus:bg-violet-200 transition-all"
            >
              rings
            </NavLink>
            <NavLink
              href="/products/necklaces"
              exact
              className="hover:bg-violet-100 hover:rounded-md px-2 py-1 focus:bg-violet-200 transition-all"
            >
              necklaces
            </NavLink>
            <NavLink
              href="/products/earrings"
              exact
              className="hover:bg-violet-100 hover:rounded-md px-2 py-1 focus:bg-violet-200 transition-all"
            >
              earrings
            </NavLink>
          </div>
          <div className="nav-collapsable flex flex-col md:flex-row gap-3 mt-4 md:mt-0 items-center">
            <Link href="/profile">
              {/* TODO: Add navbar toggling.  */}
              <a className="bg-violet-500 md:bg-inherit shadow-md md:shadow-none transition-color rounded-md px-6 py-3 w-full md:w-fit md:py-1 text-white md:text-violet-500 hover:bg-violet-800 hover:text-white ">
                <ProfileIcon className="w-5 mx-auto" alt="Profile" />
              </a>
            </Link>
            <Link href="/cart">
              <a className="bg-violet-500 shadow-lg rounded-md transition-color px-6 py-3 w-full md:py-1 text-white gap-2 justify-center hover:bg-violet-700 ">
                <ShoppingBasket className="w-5 mx-auto" alt="Cart" />
              </a>
            </Link>
          </div>
        </React.Fragment>
      ) : null}
    </nav>
  );
}
