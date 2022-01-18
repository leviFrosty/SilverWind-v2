import { v4 as uuidv4 } from "uuid";

// Admin Dashboard Keys
export const ADD_PRODUCT = "addProduct";
export const CUSTOM_RING_CONFIGURE = "customRingSelector";

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

// Shipping information

// Price is in cents
export const FREE_STANDARD_SHIPPING_ORDER_MIN = 6000;
export const FREE_EXPRESS_SHIPPING_ORDER_MIN = 15000;

// Production shipping rate IDs
export const FREE_STANDARD_SHIPPING_ID = "shr_1KJ5yNLnQbDSCNA3u5AqZQo7";
export const FREE_EXPRESS_SHIPPING_ID = "shr_1KJ5wzLnQbDSCNA3oHcBUwDS";
export const USPS_FIRST_CLASS_ID = "shr_1KJ617LnQbDSCNA3CEPtcTsW";
export const USPS_PRIORTY_MAIL_ID = "shr_1KJ63QLnQbDSCNA3UixinZZG";
export const UPS_NEXT_DAY_AIR_ID = "shr_1KJ64YLnQbDSCNA3E1EyF3er";

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
