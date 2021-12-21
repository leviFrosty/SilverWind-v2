import React from "react";
import AddProduct from "./AddProduct";

import CenterTitle from "./CenterTitle";

export default function AdminDashboard() {
  return (
    <div>
      <CenterTitle>Admin Dashboard</CenterTitle>
      <AddProduct/>
    </div>
  );
}
