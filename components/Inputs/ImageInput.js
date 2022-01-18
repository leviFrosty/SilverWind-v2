import React, { useState } from "react";
import Input from "../input";
import Spinner from "../Spinner";
import TimesSolid from "../../public/icons/times-solid.svg";

export default function ImageInput({
  title,
  name,
  accept,
  seterror,
  state,
  handleState,
  children,
  ...props
}) {
  const [processing, setprocessing] = useState(false);

  const imageUpload = async (event) => {
    setprocessing(true);
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
      return handleState("");
    }
    reader.onloadend = (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      handleState(result);
      setprocessing(false);
    };
    reader.onprogress = () => {
      setprocessing(true);
    };
  };

  const handleClearPhoto = () => {
    const element = document.querySelector(`#${name}`);
    handleState("");
    element.value = null;
  };

  return (
    <div className="relative">
      <Input
        id={name}
        title={title}
        name={name}
        type="file"
        accept={accept}
        required
        onChange={imageUpload}
        {...props}
      >
        {children}
      </Input>
      {processing ? (
        <Spinner className="absolute top-8 right-4 h-8 w-8" />
      ) : null}
      {state ? (
        <TimesSolid
          onClick={() => handleClearPhoto()}
          className="w-4 h-4 absolute top-10 right-4 text-violet-900 cursor-pointer"
        />
      ) : null}
    </div>
  );
}
