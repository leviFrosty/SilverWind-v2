import React, { useState } from "react";
import AddProduct from "./AddProduct";
import AdminLayout from "./AdminLayout";
import CenterTitle from "./CenterTitle";
import { ADD_PRODUCT, CUSTOM_RING_CONFIGURE } from "../lib/PRODUCT_KEYS";
import CustomRingConfigurer from "./CustomRingConfigurer";

export default function AdminDashboard() {
  const [focus, setFocus] = useState(ADD_PRODUCT);

  return (
    <div>
      <CenterTitle>Admin Dashboard</CenterTitle>
      <AdminLayout setFocus={setFocus}>
        {focus === ADD_PRODUCT ? <AddProduct /> : null}
        {focus === CUSTOM_RING_CONFIGURE ? <CustomRingConfigurer /> : null}
      </AdminLayout>
    </div>
  );
}
