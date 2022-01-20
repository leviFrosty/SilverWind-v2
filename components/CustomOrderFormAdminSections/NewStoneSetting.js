import React, { useEffect, useState } from "react";
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
import StoneSetting from "./../../classes/StoneSetting";
import { stoneSettingsSchema } from "../../schemas/admin/stoneSettingSchema";
import { v4 as uuidv4 } from "uuid";

export default function NewStoneSetting({
  setisStoneSettingOpen,
  isStoneSettingOpen,
}) {
  const [stoneSetting, setstoneSetting] = useState(
    new StoneSetting("", "", true)
  );
  const [error, seterror] = useState("");
  const [successCount, setsuccessCount] = useState(0);
  const [processing, setprocessing] = useState(false);
  const [imageId, setimageId] = useState(uuidv4());

  const setdescription = (value) => {
    const obj = { ...stoneSetting };
    obj.description = value;
    setstoneSetting(obj);
  };
  const setimage = (value) => {
    const obj = { ...stoneSetting };
    obj.image = value;
    setstoneSetting(obj);
  };

  const uploadImage = async () => {
    try {
      const imgRef = await ref(storage, `stoneSettings/${stoneSetting.id}`);
      await uploadString(imgRef, stoneSetting.image, "data_url");
      const imageUrl = await getDownloadURL(imgRef);
      stoneSetting.image = imageUrl; // Change to not mutate state
      uploadstoneSetting();
    } catch (err) {
      seterror(err.message);
    }
  };

  const uploadstoneSetting = async () => {
    try {
      await setDoc(doc(db, "stoneSettings", stoneSetting.id), stoneSetting);
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
    const newStoneSetting = new StoneSetting("", "", true);
    clearFileInput();
    setstoneSetting(newStoneSetting);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    seterror("");
    setprocessing(true);
    const { value, error } = stoneSettingsSchema.validate(stoneSetting);
    if (error) return seterror(error.message);
    setstoneSetting(value);
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
        onClick={() => setisStoneSettingOpen(!isStoneSettingOpen)}
      >
        <TimesSolid className="w-5 h-5 m-0 text-violet-400" />
      </div>
      <ImageInput
        title="Image"
        name={imageId}
        type="file"
        accept="image/*"
        required
        state={stoneSetting.image}
        handleState={setimage}
        seterror={seterror}
      />
      <Input
        title="Description"
        name="description"
        type="text"
        required
        value={stoneSetting.description}
        setState={setdescription}
      />

      <button
        type="submit"
        className="hover:bg-violet-600 hover:text-white bg-violet-200 py-3 rounded-md text-violet-900 font-extrabold"
      >
        {processing ? (
          <Spinner className="w-4 h-4 mx-auto" />
        ) : (
          "Add Stone Setting"
        )}
      </button>
    </Form>
  );
}
