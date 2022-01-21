import React, { useState } from "react";
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
import { v4 as uuidv4 } from "uuid";
import RingBand from "./../../classes/RingBand";
import { ringBandSchema } from "../../schemas/admin/ringBandSchema";

export default function NewRingBand({ setisRingBandOpen, isRingBandOpen }) {
  const [ringBand, setringBand] = useState(new RingBand("", "", true));
  const [error, seterror] = useState("");
  const [successCount, setsuccessCount] = useState(0);
  const [processing, setprocessing] = useState(false);
  const [imageId, setimageId] = useState(uuidv4());

  const setdescription = (value) => {
    const obj = { ...ringBand };
    obj.description = value;
    setringBand(obj);
  };
  const setimage = (value) => {
    const obj = { ...ringBand };
    obj.image = value;
    setringBand(obj);
  };

  const uploadImage = async () => {
    try {
      const imgRef = await ref(storage, `ringBands/${ringBand.id}`);
      await uploadString(imgRef, ringBand.image, "data_url");
      const imageUrl = await getDownloadURL(imgRef);
      ringBand.image = imageUrl; // Change to not mutate state
      uploadringBand();
    } catch (err) {
      seterror(err.message);
    }
  };

  const uploadringBand = async () => {
    try {
      await setDoc(doc(db, "ringBands", ringBand.id), ringBand);
      successUploadStateClear();
    } catch (err) {
      console.log(err.message);
    }
  };

  const clearFileInput = () => {
    const element = document.querySelector(`#${imageId}`);
    element.value = null;
  };

  const successUploadStateClear = () => {
    setsuccessCount(successCount + 1);
    setprocessing(false);
    seterror("");
    const newringBand = new RingBand("", "", true);
    clearFileInput();
    setringBand(newringBand);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    seterror("");
    setprocessing(true);
    const { value, error } = ringBandSchema.validate(ringBand);
    if (error) return seterror(error.message);
    setringBand(value);
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
          ? `Success! ${successCount} ring band${
              successCount > 1 ? "s" : ""
            } uploaded.`
          : null}
      </div>
      <div
        className="self-end cursor-pointer"
        onClick={() => setisRingBandOpen(!isRingBandOpen)}
      >
        <TimesSolid className="w-5 h-5 m-0 text-violet-400" />
      </div>
      <ImageInput
        title="Image"
        name={imageId}
        type="file"
        accept="image/*"
        required
        state={ringBand.image}
        handleState={setimage}
        seterror={seterror}
      />
      <Input
        title="Description"
        name="description"
        type="text"
        required
        value={ringBand.description}
        setState={setdescription}
      />

      <button
        type="submit"
        className="hover:bg-violet-600 hover:text-white bg-violet-200 py-3 rounded-md text-violet-900 font-extrabold"
      >
        {processing ? (
          <Spinner className="w-4 h-4 mx-auto" />
        ) : (
          "Add Ring Band"
        )}
      </button>
    </Form>
  );
}
