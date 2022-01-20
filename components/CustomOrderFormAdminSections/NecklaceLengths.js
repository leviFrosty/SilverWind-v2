import React, { useEffect, useState } from "react";
import Input from "../input";
import Form from "../form";
import ImageInput from "../Inputs/ImageInput";
import TimesSolid from "../../public/icons/times-solid.svg";
import { setDoc, getDoc, onSnapshot } from "@firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../lib/fbInstance";
import Spinner from "../Spinner";
import lengthSchema from "./../../schemas/admin/lengthSchema";

export default function NecklaceLengths({ setisLengthsOpen, isLengthsOpen }) {
  const [length, setlength] = useState("");
  const [lengthsList, setLengthsList] = useState([]);
  const [error, seterror] = useState("");
  const [successCount, setsuccessCount] = useState(0);
  const [processing, setprocessing] = useState(false);
  const dbRef = doc(db, "necklaceLengths", "length");

  const uploadlengths = async () => {
    try {
      const resultDoc = await getDoc(dbRef);
      const { values } = await (await resultDoc).data();
      if (values.includes(length)) {
        setprocessing(false);
        seterror("Value already exists");
        return;
      }
      const newArray = [length, ...values];
      const newData = { values: newArray.sort((a, b) => a - b) };
      await setDoc(dbRef, newData);
      successUploadStateClear();
    } catch (err) {
      seterror(err.message);
    }
  };

  const successUploadStateClear = () => {
    setsuccessCount(successCount + 1);
    setprocessing(false);
    seterror("");
    setlength(0);
  };

  const handleRemoveValue = async (value) => {
    const filteredList = lengthsList.filter((length) => length !== value);
    await setDoc(dbRef, { values: filteredList.sort((a, b) => a - b) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    seterror("");
    setprocessing(true);
    const { value, error } = lengthSchema.validate(length);
    if (error) return seterror(error.message);
    setlength(value);
    uploadlengths();
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(dbRef, (doc) => {
      const { values } = doc.data();
      setLengthsList(values);
    });
    return () => unsubscribe();
  }, []);

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
          ? `Success! ${successCount} length${
              successCount > 1 ? "s" : ""
            } uploaded.`
          : null}
      </div>
      <div
        className="self-end cursor-pointer"
        onClick={() => {
          setisLengthsOpen(!isLengthsOpen);
        }}
      >
        <TimesSolid className="w-5 h-5 m-0 text-violet-400" />
      </div>
      <div>
        {lengthsList.map((length, index) => (
          <div key={index} className="flex items-center">
            <span>{length}</span>
            <span onClick={() => handleRemoveValue(length)}>
              {" "}
              <TimesSolid className="w-2 h-2 ml-1 text-violet-400 cursor-pointer" />
            </span>
          </div>
        ))}
      </div>
      <Input
        title="Lengths"
        name="lengths"
        type="text"
        required
        value={length}
        setState={setlength}
      />
      <button
        type="submit"
        className="hover:bg-violet-600 hover:text-white bg-violet-200 py-3 rounded-md text-violet-900 font-extrabold"
      >
        {processing ? <Spinner className="w-4 h-4 mx-auto" /> : "Add length"}
      </button>
    </Form>
  );
}
