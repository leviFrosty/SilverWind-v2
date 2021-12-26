import React, { useEffect, useState } from "react";
import CenterTitle from "./CenterTitle";
import Spinner from "./Spinner";
import InputStyled from "./InputStyled";

export default function OrderCustomPage() {
  const [url, seturl] = useState("");
  const [isloading, setisloading] = useState(false);

  useEffect(() => {
    seturl(window.location.href);
  }, []);

  return (
    <>
      <CenterTitle>Order Custom</CenterTitle>
      <form
        className="flex flex-col max-w-screen-sm mx-auto"
        method="POST"
        action="https://formsubmit.co/julia@silverwind.store"
        encType="multipart/form-data"
      >
        <InputStyled
          type="email"
          name="email"
          title="email"
          autoFocus
          placeholder="email@domain.com"
        />
        <label className="text-violet-900" htmlFor="message">
          message
        </label>
        <textarea
          className=" placeholder:opacity-75 rounded-md text-violet-900 mb-4 focus:border-violet-600 block w-full bg-violet-100 border-violet-200 px-3 py-2 focus:ring-violet-500"
          title="Message"
          name="message"
          placeholder="I want a size 5 silver ring with an medium size opal gemstone and..."
        ></textarea>
        <InputStyled
          type="file"
          name="attachment"
          title="reference image"
          accept="image/*"
        />
        <InputStyled
          type="hidden"
          name="_subject"
          value="New Custom Order!"
        ></InputStyled>

        <input type="text" name="_honey" className="hidden" />
        <input type="hidden" name="_template" value="box" />
        <input
          type="hidden"
          name="_autoresponse"
          value="Thanks for your custom order! Expect a response from us within 24 hours. If you need to add additional information, simply reply to this email."
        />
        <input type="hidden" name="_next" value={`${url}/success`}></input>
        <button
          className="flex justify-center shadow-md bg-violet-900 rounded-md hover:bg-violet-500 text-white px-8 py-2 my-4"
          type="submit"
          onClick={() => setisloading(true)}
        >
          {isloading ? <Spinner className="text-white" /> : `Submit Request!`}
        </button>
      </form>
    </>
  );
}
