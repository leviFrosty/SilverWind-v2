import Image from "next/image";
import React from "react";

export default function ProductCard({ product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <Image
        src={product.coverPhotoURL}
        width={200}
        height={300}
        objectFit="cover"
        alt={product.name}
      />
      <p>{product.price}</p>
    </div>
  );
}
