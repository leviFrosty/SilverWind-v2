import React from "react";
import ProfileNav from "./ProfileNav";

export default function ProfileLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row w-full ">
      <ProfileNav />
      <div className="flex flex-col flex-grow justify-center">{children}</div>
    </div>
  );
}
