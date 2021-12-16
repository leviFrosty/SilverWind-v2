import { PRICE_ASC, PRICE_DESC } from "./PRODUCT_KEYS";

export const sortProducts = (sort, products, setselectedProducts) => {
  const newarr = [...products];
  switch (sort.type) {
    case PRICE_ASC: {
      const sorted = newarr.sort((a, b) => a.price - b.price);
      setselectedProducts(sorted);
      break;
    }
    case PRICE_DESC: {
      const sorted = newarr.sort((a, b) => b.price - a.price);
      setselectedProducts(sorted);
    }
    default: {
    }
  }
};
