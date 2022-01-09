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

// Checkout information

// Price is in cents
export const FREE_STANDARD_SHIPPING_ORDER_MIN = 6000;
export const FREE_EXPRESS_SHIPPING_ORDER_MIN = 15000;
export const FREE_STANDARD_SHIPPING_ID = "shr_1KG6psLnQbDSCNA3JGNiDZcO";
export const FREE_EXPRESS_SHIPPING_ID = "shr_1KG9gcLnQbDSCNA3ON6H9EB4";
export const USPS_FIRST_CLASS_ID = "shr_1KG6p8LnQbDSCNA3drFPUER6";
export const USPS_PRIORTY_MAIL_ID = "shr_1KG6mPLnQbDSCNA3yzBkSVQd";
export const UPS_NEXT_DAY_AIR_ID = "shr_1KG78iLnQbDSCNA3QVnvUhDC";

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
