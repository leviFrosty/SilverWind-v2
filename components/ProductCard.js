import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

export default function ProductCard({ product }) {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/products/${product.id}`)}>
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
