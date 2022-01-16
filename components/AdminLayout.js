import React from "react";
import { ADD_PRODUCT, CUSTOM_RING_CONFIGURE } from "../lib/PRODUCT_KEYS";

export default function AdminLayout({ className, children, setFocus }) {
  return (
    <div className={className}>
      <div className="flex flex-row gap-1 flex-wrap text-violet-900">
        <button className="underline" onClick={() => setFocus(ADD_PRODUCT)}>
          Add Product
        </button>
        <button
          className="underline"
          onClick={() => setFocus(CUSTOM_RING_CONFIGURE)}
        >
          Custom Ring Configurer
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}
