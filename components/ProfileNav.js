import { signOut } from "firebase/auth";

import { useRouter } from "next/router";
import { auth } from "../lib/fbInstance";
import NavLink from "./NavLink";

export default function ProfileNav() {
  const router = useRouter();
  const signOutUser = () => {
    signOut(auth);
    router.push("/login");
  };

  return (
    <div className="flex justify-center flex-row gap-2 md:flex-col my-4 md:my-0 md:mx-10 md:gap-4">
      <NavLink
        className="text-violet-900 hover:bg-violet-100 active:bg-violet-100 px-2 py-1 rounded-md h"
        href="/profile"
        exact
      >
        Profile
      </NavLink>
      <NavLink
        className="text-violet-900 hover:bg-violet-100 active:bg-violet-100 px-2 py-1 rounded-md h"
        href="/profile/settings"
      >
        Settings
      </NavLink>
      <NavLink
        className="text-violet-900 hover:bg-violet-100 active:bg-violet-100 px-2 py-1 rounded-md h"
        href="/profile/likes"
      >
        Likes
      </NavLink>
      <NavLink
        className="text-violet-900 hover:bg-violet-100 active:bg-violet-100 px-2 py-1 rounded-md h"
        href="/profile/orders"
      >
        Orders
      </NavLink>
      <button
        className="hover:underline hover:decoration-2 hover:decoration-violet-500 rounded-md text-violet-900"
        onClick={() => signOutUser()}
      >
        Sign Out
      </button>
    </div>
  );
}
