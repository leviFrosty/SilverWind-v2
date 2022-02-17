import React, { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import AdminLayout from "./AdminLayout";
import CenterTitle from "./CenterTitle";
import {
  ADD_PRODUCT,
  CUSTOM_RING_CONFIGURE,
  VIEW_ALL_PRODUCTS,
} from "../lib/PRODUCT_KEYS";
import CustomRingConfigurer from "./CustomRingConfigurer";
import AdminViewAllProducts from "./AdminViewAllProducts";

export default function AdminDashboard({ products }) {
  const [focus, setFocus] = useState(ADD_PRODUCT);
  const [currentlyEditingProduct, setCurrentlyEditingProduct] = useState({});

  return (
    <div>
      <CenterTitle>Admin Dashboard</CenterTitle>
      <AdminLayout
        setFocus={setFocus}
        setCurrentlyEditingProduct={setCurrentlyEditingProduct}
      >
        {focus === VIEW_ALL_PRODUCTS ? (
          <AdminViewAllProducts
            products={products}
            setFocus={setFocus}
            setCurrentlyEditingProduct={setCurrentlyEditingProduct}
          />
        ) : null}
        {focus === ADD_PRODUCT ? (
          <AddProduct currentlyEditingProduct={currentlyEditingProduct} />
        ) : null}
        {focus === CUSTOM_RING_CONFIGURE ? <CustomRingConfigurer /> : null}
      </AdminLayout>
    </div>
  );
}
