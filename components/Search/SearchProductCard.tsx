import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SearchProductCard({ product }) {
  return (
    <div className=" bg-violet-100 text-violet-900 rounded-sm p-2">
      <Link href={"/products/" + product.id}>
        <a className="flex flex-row">
          <div className="relative w-24 h-16">
            <Image
              src={product.coverPhotoURL}
              alt={product.name}
              layout="fill"
              className="object-cover"
            />
          </div>
          <div className="flex flex-row items-center justify-center flex-grow">
            {product.name}
          </div>
          <div className="flex flex-row items-center justify-center flex-grow font-semibold">
            ${product.price}
          </div>
        </a>
      </Link>
    </div>
  );
}
