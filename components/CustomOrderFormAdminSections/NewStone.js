import React, { useState } from "react";
import Stone from "../../classes/Stone";
import Input from "../input";
import Form from "../form";
import ImageInput from "../Inputs/ImageInput";
import TimesSolid from "../../public/icons/times-solid.svg";
import { setDoc } from "@firebase/firestore";
import { doc } from "firebase/firestore";
import { db, storage } from "../../lib/fbInstance";
import { ref } from "firebase/storage";
import { uploadString, getDownloadURL } from "@firebase/storage";
import Spinner from "../Spinner";
import { stoneSchema } from "./../../schemas/admin/customOrdersSchema";

export default function NewStone({ setisStoneOpen, isStoneOpen }) {
  const [stone, setStone] = useState(new Stone("", "", 0, ""));
  const [error, seterror] = useState("");
  const [successCount, setsuccessCount] = useState(0);
  const [processing, setprocessing] = useState(false);

  const setdescription = (value) => {
    const obj = { ...stone };
    obj.description = value;
    setStone(obj);
  };
  const setquantity = (value) => {
    const obj = { ...stone };
    obj.quantity = value;
    setStone(obj);
  };
  const setdimensions = (value) => {
    const obj = { ...stone };
    obj.dimensions = value;
    setStone(obj);
  };
  const setimage = (value) => {
    const obj = { ...stone };
    obj.image = value;
    setStone(obj);
  };

  const uploadImage = async () => {
    try {
      const imgRef = await ref(storage, `stones/${stone.id}`);
      await uploadString(imgRef, stone.image, "data_url");
      const imageUrl = await getDownloadURL(imgRef);
      stone.image = imageUrl;
      uploadStone();
    } catch (err) {
      seterror(err.message);
    }
  };

  const uploadStone = async () => {
    try {
      await setDoc(doc(db, "stones", stone.id), stone);
      successUploadStateClear();
    } catch (err) {
      console.log(err.message);
    }
  };

  const clearFileInput = () => {
    const element = document.querySelector("#image");
    setimage("");
    element.value = null;
  };

  const successUploadStateClear = () => {
    setsuccessCount(successCount + 1);
    setprocessing(false);
    seterror("");
    const newStone = new Stone("", "", 0, "");
    console.log(newStone);
    clearFileInput();
    setStone(newStone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    seterror("");
    setprocessing(true);
    const { value, error } = stoneSchema.validate(stone);
    if (error) return seterror(error.message);
    setStone(value);
    uploadImage();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      error={error}
      className="flex flex-col border-2 border-violet-900 shadow-md py-4 rounded-md p-2"
    >
      <div
        className={
          successCount > 0
            ? `text-green-600 bg-green-100 rounded-md px-3 py-1`
            : ""
        }
      >
        {successCount > 0
          ? `Success! ${successCount} stone${
              successCount > 1 ? "s" : ""
            } uploaded.`
          : null}
      </div>
      <div
        className="self-end cursor-pointer"
        onClick={() => setisStoneOpen(!isStoneOpen)}
      >
        <TimesSolid className="w-5 h-5 m-0 text-violet-400" />
      </div>
      <ImageInput
        title="Image"
        name="image"
        type="file"
        accept="image/*"
        required
        state={stone.image}
        handleState={setimage}
        seterror={seterror}
      />
      <Input
        title="Description"
        name="description"
        type="text"
        required
        value={stone.description}
        setState={setdescription}
      />
      <Input
        title="Quantity"
        name="quantity"
        type="number"
        min={1}
        required
        value={stone.quantity}
        setState={setquantity}
      />
      <Input
        title="Dimensions"
        name="dimensions"
        type="text"
        required
        value={stone.dimensions}
        setState={setdimensions}
      />
      <button
        type="submit"
        className="hover:bg-violet-600 hover:text-white bg-violet-200 py-3 rounded-md text-violet-900 font-extrabold"
      >
        {processing ? <Spinner className="w-4 h-4 mx-auto" /> : "Add Stone"}
      </button>
    </Form>
  );
}
