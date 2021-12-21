import { v4 as uuidv4 } from "uuid";

// Sorts
export const PRICE_ASC = "priceAsc";
export const PRICE_DESC = "priceDesc";
export const CREATED_AT_ASC = "createdAtAsc";
export const CREATED_AT_DESC = "createdAtDesc";

// Filters
export const CATEGORY = "category";

// Categories
export const RINGS = "rings";
export const EARRINGS = "earrings";
export const NECKLACES = "necklaces";
export const BRACELETS = "bracelets";

export const MAKE_PRODUCT_SKELETON = () => {
  return {
    name: "",
    category: "",
    description: "",
    material: "",
    price: 0,
    quantity: 0,
    coverImage: "", // base64 encoded image, removed during upload
    otherImages: [], // array of base64 encoded images, removed during upload
    createdAt: Date.now(),
    active: true,
    id: uuidv4(),
  };
};
