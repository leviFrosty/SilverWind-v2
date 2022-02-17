import Image from "next/image";
import { useRouter } from "next/router";
import { getProducts } from "../lib/getProducts";
import { ADD_PRODUCT } from "../lib/PRODUCT_KEYS";

export default function AdminViewAllProducts({
  products,
  setFocus,
  setCurrentlyEditingProduct,
}) {
  const handleEdit = (product: {}) => {
    setCurrentlyEditingProduct(product);
    setFocus(ADD_PRODUCT);
  };
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col gap-3 bg-violet-100 rounded-lg p-4"
        >
          <div className="w-full relative h-[250px]">
            <Image
              onClick={() => router.push(`products/${product.id}`)}
              layout="fill"
              className="object-cover hover:cursor-pointer"
              src={product.coverPhotoURL}
              alt={product.name}
            />
          </div>
          <div className="flex flex-row justify-between">
            <h2 className="font-bold">{product.name}</h2>
            <p>${product.price}</p>
          </div>
          <button
            className="py-2 flex flex-row justify-center bg-violet-400 rounded-lg text-white hover:bg-violet-600"
            onClick={() => handleEdit(product)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}
