import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useContext } from "react";
import UserContext from "../contexts/userContext";
import { auth } from "../lib/fbInstance";
import NavLink from "./NavLink";

export default function ProfileNav() {
  const { user, isLoading } = useContext(UserContext);
  const router = useRouter();
  const signOutUser = () => {
    signOut(auth);
    router.push("/login");
  };

  return (
    <div className="flex justify-center md:justify-start md:mt-5 md:border-r-2 flex-row gap-1 md:flex-col my-4 md:my-0 md:px-10 md:gap-4">
      <NavLink
        className="text-violet-900 hover:bg-violet-100 active:bg-violet-100 px-2 py-1 rounded-md underline"
        href="/profile"
        exact
      >
        Profile
      </NavLink>
      <div
        className={`flex flex-row md:flex-col ${
          !isLoading && user.isAnonymous
            ? "pointer-events-none blur-sm hover:cursor-not-allowed"
            : ""
        }`}
      >
        <NavLink
          className="text-violet-900 hover:bg-violet-100 active:bg-violet-100 px-2 py-1 rounded-md underline"
          href="/profile/settings"
        >
          Settings
        </NavLink>
        <NavLink
          className="text-violet-900 hover:bg-violet-100 active:bg-violet-100 px-2 py-1 rounded-md underline"
          href="/profile/likes"
        >
          Likes
        </NavLink>
        <NavLink
          className="text-violet-900 hover:bg-violet-100 active:bg-violet-100 px-2 py-1 rounded-md underline"
          href="/profile/orders"
        >
          Orders
        </NavLink>
      </div>
      <button
        className="underline md:no-underline hover:underline hover:decoration-2 hover:decoration-violet-500 rounded-md text-violet-100 bg-violet-900 px-1"
        onClick={() => signOutUser()}
      >
        Sign Out
      </button>
    </div>
  );
}
