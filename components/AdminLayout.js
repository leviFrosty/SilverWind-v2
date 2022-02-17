import React from "react";
import {
  ADD_PRODUCT,
  CUSTOM_RING_CONFIGURE,
  VIEW_ALL_PRODUCTS,
} from "../lib/PRODUCT_KEYS";

export default function AdminLayout({
  className,
  children,
  setFocus,
  setCurrentlyEditingProduct,
}) {
  return (
    <div className={className}>
      <div className="flex flex-row bg-violet-900 mb-5   shadow-md md:gap-8 text-white py-2 md:flex-row gap-3 flex-wrap justify-center">
        <button
          className="underline hover:opacity-80"
          onClick={() => setFocus(VIEW_ALL_PRODUCTS)}
        >
          Products
        </button>
        <button
          className="underline hover:opacity-80"
          onClick={() => {
            setFocus(ADD_PRODUCT);
            setCurrentlyEditingProduct({});
          }}
        >
          Add Product
        </button>
        <button
          className="underline hover:opacity-80"
          onClick={() => setFocus(CUSTOM_RING_CONFIGURE)}
        >
          Custom Ring Configurer
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}
