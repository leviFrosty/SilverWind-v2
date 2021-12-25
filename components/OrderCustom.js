import Link from "next/link";
const OrderCustom = () => {
  return (
    <>
      <div className="flex items-center md:gap-8 flex-col-reverse md:flex-row justify-center my-10 px-4">
        <Link href="/custom">
          <a className="mt-4 md:mt-0 bg-violet-900 text-white text-center hover:bg-violet-500 px-10 transition-colors py-3 rounded-md">
            Order Custom
          </a>
        </Link>

        <p className="text-violet-900 opacity-75 font-bold text-xl text-center">
          Want something special?
        </p>
      </div>
    </>
  );
};

export default OrderCustom;
