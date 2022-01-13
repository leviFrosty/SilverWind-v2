import React, { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { doc, setDoc } from "@firebase/firestore";
import { db, storage } from "../lib/fbInstance";
import { v4 as uuidv4 } from "uuid";
import SpinnerFullScreen from "./SpinnerFullScreen";
import Input from "./input";
import Form from "./form";
import {
  BRACELETS,
  EARRINGS,
  MAKE_PRODUCT_SKELETON,
  NECKLACES,
  RINGS,
} from "../lib/PRODUCT_KEYS";
import Select from "./Select";
import Spinner from "./Spinner";
import axios from "axios";

export default function AddProduct() {
  const [isLoadingSkele, setisloadingskele] = useState(true);
  const [processing, setprocessing] = useState(false);
  const [error, seterror] = useState("");
  const [product, setProduct] = useState({});

  // Initialize product skeleton
  useEffect(() => {
    const skele = MAKE_PRODUCT_SKELETON(); // generates new product id and properties
    setProduct(skele);
    setisloadingskele(false);
  }, []);

  // State handlers
  const setname = (name) => {
    const obj = { ...product };
    obj.name = name;
    setProduct(obj);
  };
  const setmaterial = (material) => {
    const obj = { ...product };
    obj.material = material;
    setProduct(obj);
  };
  const setdescription = (description) => {
    const obj = { ...product };
    obj.description = description;
    setProduct(obj);
  };
  const setcategory = (category) => {
    const obj = { ...product };
    obj.category = category;
    setProduct(obj);
  };
  const setprice = (price) => {
    const obj = { ...product };
    obj.price = price;
    setProduct(obj);
  };
  const setquantity = (quantity) => {
    const obj = { ...product };
    obj.quantity = quantity;
    setProduct(obj);
  };

  const setotherImages = (otherImages) => {
    const obj = { ...product };
    obj.otherImages = otherImages;
    setProduct(obj);
  };

  const setcoverImage = (coverImage) => {
    const obj = { ...product };
    obj.coverImage = coverImage;
    setProduct(obj);
  };

  const setcoverPhotoURL = (coverPhotoURL) => {
    const obj = { ...product };
    obj.coverPhotoURL = coverPhotoURL;
    setProduct(obj);
  };
  const setotherImagesURLS = (otherImagesURLS) => {
    const obj = { ...product };
    obj.otherImagesURLS = otherImagesURLS;
    setProduct(obj);
  };

  // File Image handlers
  const handleCoverChange = async (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onerror = (err) => seterror(err);
    reader.onabort = (err) => seterror(err);
    if (theFile && theFile.type.match("image.*")) {
      reader.readAsDataURL(theFile);
    } else {
      return setcoverImage("");
    }
    reader.onloadend = (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      setcoverImage(result);
      setprocessing(false);
    };
    reader.onprogress = () => {
      setprocessing(true);
    };
  };

  const handleOtherImagesChange = async (event) => {
    const files = event.target.files;
    const filesArray = Object.values(files);
    let results = [];
    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.onerror = (err) => seterror(err);
      reader.onabort = (err) => seterror(err);
      if (file && file.type.match("image.*")) {
        reader.readAsDataURL(file);
      } else {
        return setotherImages([]);
      }
      reader.onloadend = (finishedEvent) => {
        const {
          target: { result },
        } = finishedEvent;
        results.push(result);
        setprocessing(false);
      };
      reader.onprogress = () => {
        setprocessing(true);
      };
    });
    setotherImages(results);
  };

  // Upload handler
  const onSubmit = async (e) => {
    e.preventDefault();
    setprocessing(true);

    // Upload cover image to storage bucket
    const coverImgStorageRef = await ref(
      storage,
      `products/${product.name}-${uuidv4()}`
    );

    let coverPhotoURL = "";
    await uploadString(coverImgStorageRef, product.coverImage, "data_url")
      .then(async () => {
        coverPhotoURL = await getDownloadURL(coverImgStorageRef);
      })
      .catch((err) => seterror(err));
    setcoverPhotoURL(coverPhotoURL);

    // Upload other images to storage bucket
    let otherImagesURLs = [];
    for (const image of product.otherImages) {
      const imgRef = await ref(storage, `products/${product.name}-${uuidv4()}`);
      await uploadString(imgRef, image, "data_url").catch((e) => seterror(e));
      const url = await getDownloadURL(imgRef).catch((e) => seterror(e));
      otherImagesURLs = [url, ...otherImagesURLs];
    }
    setotherImagesURLS(otherImagesURLs);

    // Destructuring workaround for state object properties [otherImagesURLS, coverPhotoURL]
    // being undefined when pulling from the product obj from state in setDoc().
    const { otherImages, coverImage, ...newobj } = product;
    const newProductData = {
      ...newobj,
      coverPhotoURL,
      otherImagesURLs,
    };

    // Upload to product & price stripe
    const stripeRequest = axios.post("/api/stripe/add-product", newProductData);
    stripeRequest.then((res) => {
      const stripePriceRequest = axios.post(
        "/api/stripe/add-price",
        newProductData
      );
      stripePriceRequest.then((res) => {
        const newProductDataWithPrice = {
          ...newProductData,
          priceId: res.data.id,
        };
        // Upload document to database
        const dbRef = doc(db, "products", product.id);
        setDoc(dbRef, newProductDataWithPrice)
          .catch((err) => seterror(err))
          .then(() => {
            setprocessing(false);
            const skele = MAKE_PRODUCT_SKELETON(); // generates new product id and properties
            setProduct(skele);
          });
      });
    });
  };

  return (
    <React.Fragment>
      {isLoadingSkele ? (
        <SpinnerFullScreen />
      ) : (
        <Form onSubmit={onSubmit} error={error} className="mx-2">
          <Input
            name="name"
            title="name"
            type="text"
            value={product.name}
            setState={setname}
            required
          />
          <Input
            name="description"
            title="description"
            type="text"
            value={product.description}
            setState={setdescription}
            required
          />
          <Input
            name="material"
            title="material"
            type="text"
            value={product.material}
            setState={setmaterial}
            required
          />
          <Input
            name="coverImg"
            title="cover image"
            type="file"
            required
            onChange={handleCoverChange}
          />
          <Input
            name="otherimgs"
            title="other images"
            type="file"
            multiple
            required
            onChange={handleOtherImagesChange}
          />
          <Select
            id="category"
            title="category"
            required
            value={product.category}
            setState={setcategory}
          >
            <option>-- select category -- </option>
            <option>{RINGS}</option>
            <option>{NECKLACES}</option>
            <option>{EARRINGS}</option>
            <option>{BRACELETS}</option>
          </Select>
          <Input
            name="quantity"
            title="quantity"
            type="number"
            step="1"
            required
            value={product.quantity}
            setState={setquantity}
          />
          <Input
            name="price"
            title="price"
            type="number"
            step=".01"
            placeholder="12.34"
            required
            value={product.price}
            setState={setprice}
          />
          <p className="text-sm text-violet-900 opacity-75">Format as: 00.00</p>
          <button
            className="disabled:opacity-50 disabled:cursor-default disabled:hover:bg-violet-500 cursor-pointer bg-violet-500 w-full text-white rounded-md px-3 py-2 my-4 hover:bg-violet-600 active:bg-violet-600"
            type="submit"
            disabled={error ? true : false}
          >
            {processing ? <Spinner className="mx-auto text-white h-6" /> : "Submit"}
          </button>
        </Form>
      )}
    </React.Fragment>
  );
}
