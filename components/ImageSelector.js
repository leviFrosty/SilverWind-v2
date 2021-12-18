import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import TimesSolid from "../public/icons/times-solid.svg";

export default function ImageSelector({ product }) {
  const [selectedImage, setSelectedImage] = useState({});
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  useEffect(() => {
    setSelectedImage(product.coverPhotoURL);
  }, []);

  return (
    <>
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
        <img src={selectedImage} alt="" className="w-full max-h-full object-contain" />
        <div
          className="absolute top-[2%] right-[2%] w-8"
          onClick={() => setmodalIsOpen(false)}
          alt="close modal"
        >
          <TimesSolid className="text-gray-400 hover:text-gray-500 transition-color cursor-pointer" />
        </div>
      </Modal>
      <div className="w-full h-[400px] bg-gray-100 rounded-md shadow-md my-2 flex align-middle " onClick={() => setmodalIsOpen(true)}>
        <img src={selectedImage} className="object-contain w-full max-h-full" alt={product.name} />
      </div>

      <div className="grid grid-cols-5 gap-1">
        <img
          src={product.coverPhotoURL}
          style={{
            border:
              selectedImage === product.coverPhotoURL
                ? "3px solid rgb(139, 92, 246)"
                : "none",
          }}
          className="h-20 w-20 object-cover cursor-pointer"
          onClick={() => setSelectedImage(product.coverPhotoURL)}
        />
        {product.otherImagesURLs.map((img, index) => (
          <img
            style={{
              border: selectedImage === img ? "3px solid rgb(139, 92, 246)" : "none",
            }}
            onClick={() => setSelectedImage(img)}
            className="h-20 w-20 object-cover cursor-pointer"
            src={img}
            alt=""
            key={index}
          />
        ))}
      </div>
    </>
  );
}
