// src/App.js
import React, { useState, useRef, useEffect } from "react";
import "./UploadImage.css";

const UploadImage = ({ image, setImage, data }) => {
  const [previewImage, setPreviewImage] = useState(
    data?.image ? `http://localhost:3001/${data.image}` : null
  );
  const [fileUploading, setFileUploading] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    setPreviewImage(data?.image ? `http://localhost:3001/${data.image}` : null);
  }, [data]);

  const uploadFile = (e) => {
    const selectedFile = e.target.files[0];
    const value = e.target.value;
    var ext = value.split(".").pop().toLowerCase();
    if (!["gif", "png", "jpg", "jpeg"].includes(ext)) {
      toast.error("Only gif, png, jpg,jpeg files are supported");
    } else {
      // btnOuter.addClass("file_uploading");
      setFileUploading(true);
      var uploadedFile = URL.createObjectURL(e.target.files[0]);
      setTimeout(function () {
        setPreviewImage(uploadedFile);
        setImage(selectedFile);
        imageRef.current.value = null;
      }, 1500);
    }
  };
  const removeImage = (e) => {
    e.preventDefault();
    setImage(null);
    setPreviewImage(null);
    setFileUploading(false);
  };

  return (
    <>
      <div className="image-container">
        <div className="panel">
          {previewImage ? (
            <div
              id="uploaded_view"
              className={`uploaded_file_view ${previewImage ? "show" : ""}`}
            >
              <span className="file_remove" onClick={removeImage}>
                X
              </span>
              <img src={previewImage} alt={"user image"} />
            </div>
          ) : (
            <div
              className={`button_outer ${
                previewImage
                  ? "file_uploaded file_uploading"
                  : fileUploading
                  ? "file_uploading"
                  : ""
              }`}
            >
              <div className="btn_upload">
                <input
                  type="file"
                  id="upload_file"
                  name="userImage"
                  ref={imageRef}
                  onChange={(e) => uploadFile(e)}
                />
                Upload Image
              </div>
              <div className="processing_bar"></div>
              {/* <div className="success_box"></div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UploadImage;
