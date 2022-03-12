import { v4 as uuidv4 } from "uuid";

export const RING_SIZES = [
  0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9,
  9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5,
];

// Admin Dashboard Keys
export const ADD_PRODUCT = "addProduct";
export const CUSTOM_RING_CONFIGURE = "customRingSelector";
export const VIEW_ALL_PRODUCTS = "viewAllProducts";

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
    customizable: false,
    material: "",
    stone: "",
    price: 0,
    quantity: 0,
    coverImage: "", // base64 encoded image, removed during upload
    otherImages: [], // array of base64 encoded images, removed during upload
    createdAt: Date.now(),
    active: true,
    id: uuidv4(),
  };
};

export const CUSTOM_ORDERS_OPTIONS_SKELETON = {
  // General Options
  stones: [
    {
      id: "",
      image: "",
      description: "",
      quantity: 1,
      dimensions: "",
    },
  ],
  stoneSettings: [
    {
      id: "",
      image: "",
      description: "",
    },
  ],
  back_exposed: false,
  // Category Specific
  categories: [
    {
      name: "necklaces",
      options: {
        lengths: [],
      },
    },
    ,
    {
      name: "rings",
      options: {
        bands: [
          {
            id: "",
            image: "",
            description: "",
          },
        ],
      },
    },
    {
      name: "earrings",
      options: {
        earringType: [
          { name: "", image: "", id: "" },
          { name: "", image: "", id: "" },
        ],
      },
    },
  ],
};
