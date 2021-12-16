import { CATEGORY } from "./PRODUCT_KEYS";
export const filterProducts = (
  filter,
  selectedProducts,
  setselectedProducts
) => {
  let filteredList = [];
  switch (filter.type) {
    case CATEGORY: {
      filteredList = selectedProducts.filter(
        (product) => product.category === filter.value
      );
      setselectedProducts(filteredList);
      break;
    }
    default: {
    }
  }
};
