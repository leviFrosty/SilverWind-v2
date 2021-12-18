import React, { useEffect, useState } from "react";
import Modal from "react-modal";

export default function ImageSelector({ product }) {
  const [selectedImage, setSelectedImage] = useState({});
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [selected, setselected] = useState({});

  useEffect(() => {
    setselected(product.coverPhotoURL);
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
        <img src={selectedImage} alt="" className="modal-image" />
        <div
          className="modal-close"
          onClick={() => setmodalIsOpen(false)}
          alt="close modal"
        >
          <TimesSolid />
        </div>
      </Modal>

      <div className="preview" onClick={() => setmodalIsOpen(true)}>
            <img src={selectedImage} alt={product.name} />
          </div>
          <div className="preview-items">
            <img
              src={product.coverPhotoURL}
              style={{
                border:
                  selectedImage === product.coverPhotoURL
                    ? "4px solid #240066"
                    : "none",
              }}
              onClick={() => setSelectedImage(product.coverPhotoURL)}
            />
            {product.otherImagesURLs.map((img, index) => (
              <img
                style={{
                  border: selectedImage === img ? "4px solid #240066" : "none",
                }}
                onClick={() => setSelectedImage(img)}
                src={img}
                alt=""
                key={index}
              />
            ))}
          </div>
    </>
  );
}
