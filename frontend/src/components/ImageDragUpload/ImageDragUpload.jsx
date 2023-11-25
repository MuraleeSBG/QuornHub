import React, { useState } from "react";
import "./ImageDragUpload.scss";
import upload from "../../images/upload-big-arrow.svg";
import editIcon from "../../images/edit.svg";

const ImageDragUpload = ({ selectedImage, setSelectedImage, initialImage }) => {
  // drag state
  const [dragActive, setDragActive] = useState(false);
  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedImage(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <>
      {(initialImage || selectedImage) && (
        <>
          <img
            id="form-file-upload"
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : `http://localhost:3001/uploads/${initialImage}`
            }
            alt="uploaded file"
          />
        </>
      )}
      <div
        id={initialImage || selectedImage ? "" : "form-file-upload"}
        onDragEnter={handleDrag}
      >
        <input
          type="file"
          id="input-file-upload"
          name="image"
          multiple={false}
          onChange={handleChange}
          accept="image/gif, image/jpeg, image/png"
        />
        <label
          id={initialImage || selectedImage ? "" : "label-file-upload"}
          htmlFor="input-file-upload"
          className={dragActive ? "drag-active" : ""}
        >
          {initialImage || selectedImage ? (
            <div className="editImageButton" role="button">
              <img src={editIcon} className="editIcon" alt="edit" />
            </div>
          ) : (
            <div className="uploadContainer">
              <img className="uploadImage" src={upload} alt="upload" />
              <p className="drag">Drag and drop your file here</p>
              <p>-OR-</p>
              <p className="clickToUpload">Browse Files</p>
            </div>
          )}
        </label>
        {dragActive ? (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          />
        ) : null}
      </div>
    </>
  );
};

export default ImageDragUpload;
