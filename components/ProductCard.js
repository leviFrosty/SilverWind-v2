import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

export default function ProductCard({ product }) {
  const router = useRouter();

  return (
    <article
      className="flex flex-col bg-violet-100 p-2 rounded-md shadow-lg cursor-pointer"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <div className="relative h-[250px] md:h-[275px] w-[100%]">
        <Image
          src={product.coverPhotoURL}
          layout="fill"
          objectFit="cover"
          alt={product.name}
          className="rounded-md"
        />
      </div>
      <div className="flex justify-end">
        <span className="text-violet-900 font-bold text-lg">
          ${product.price}
        </span>
      </div>
    </article>
  );
}
