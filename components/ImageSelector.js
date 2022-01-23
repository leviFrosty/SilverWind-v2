import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import TimesSolid from "../public/icons/times-solid.svg";

export default function ImageSelector({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.coverPhotoURL);
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 md:flex-row-reverse">
      <Modal
        style={{
          content: {
            display: "flex",
            overflow: "hidden",
            padding: "0px",
            alignItems: "center",
          },
        }}
        isOpen={modalIsOpen}
        onRequestClose={() => setmodalIsOpen(false)}
      >
        <Image
          src={selectedImage}
          alt=""
          layout="fill"
          className="w-full max-h-full object-contain"
        />
        <div
          className="absolute top-[2%] right-[2%] w-8"
          onClick={() => setmodalIsOpen(false)}
          alt="close modal"
        >
          <TimesSolid className="text-gray-400 hover:text-gray-500 transition-color cursor-pointer" />
        </div>
      </Modal>
      <div
        className="relative w-full md:w-[500px] h-[400px] bg-violet-100 rounded-md shadow-lg my-2 flex align-middle "
        onClick={() => setmodalIsOpen(true)}
      >
        <Image
          src={selectedImage}
          layout="fill"
          priority
          className="object-contain w-full max-h-full cursor-pointer"
          alt={product.name}
        />
      </div>
      <div className="grid grid-cols-5 gap-1 md:grid-cols-1 h-fit">
        <div
          className="h-20 w-20 relative"
          style={{
            border:
              selectedImage === product.coverPhotoURL
                ? "3px solid rgb(139, 92, 246)"
                : "none",
          }}
        >
          <Image
            src={product.coverPhotoURL}
            layout="fill"
            alt=""
            className="h-20 w-20 object-cover cursor-pointer"
            onClick={() => setSelectedImage(product.coverPhotoURL)}
          />
        </div>
        {product.otherImagesURLs.map((img, index) => (
          <div
            className="h-20 w-20 relative"
            key={index}
            style={{
              border:
                selectedImage === img ? "3px solid rgb(139, 92, 246)" : "none",
            }}
          >
            <Image
              onClick={() => setSelectedImage(img)}
              className="object-cover cursor-pointer"
              src={img}
              alt=""
              layout="fill"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
