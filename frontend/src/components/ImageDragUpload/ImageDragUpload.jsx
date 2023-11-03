import React, { useEffect, useRef, useState } from "react";
import "./ImageDragUpload.scss";
import upload from "../../images/upload-big-arrow.svg";

const ImageDragUpload = ({ selectedImage, setSelectedImage }) => {
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
		<div>
			{selectedImage ? (
				<img id="form-file-upload" src={URL.createObjectURL(selectedImage)} />
			) : (
				<div id="form-file-upload" onDragEnter={handleDrag}>
					<input
						type="file"
						id="input-file-upload"
						multiple={true}
						onChange={handleChange}
					/>

					<label
						id="label-file-upload"
						htmlFor="input-file-upload"
						className={dragActive ? "drag-active" : ""}
					>
						<div className="uploadContainer">
							<img className="uploadImage" src={upload} alt="upload image" />
							<p className="drag">Drag and drop your file here</p>
							<p>-OR-</p>
							<p className="clickToUpload" >Browse Files</p>
						</div>
					</label>
					{dragActive && (
						<div
							id="drag-file-element"
							onDragEnter={handleDrag}
							onDragLeave={handleDrag}
							onDragOver={handleDrag}
							onDrop={handleDrop}
						></div>
					)}
				</div>
			)}
		</div>
	);
};

export default ImageDragUpload;
