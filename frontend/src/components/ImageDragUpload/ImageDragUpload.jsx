import React, { useEffect, useRef, useState } from "react";
import "./ImageDragUpload.scss";

// drag drop file component
const ImageDragUpload = () => {
	// drag state
	const [dragActive, setDragActive] = useState(false);
	// selected image state
	const [selectedImage, setSelectedImage] = useState();
	// ref
	const inputRef = useRef(null);

	useEffect(() => {
		console.log(selectedImage);
	}, [selectedImage]);

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

	// triggers when file is dropped
	const handleDrop = function (e) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			setSelectedImage(e.dataTransfer.files[0]);
		}
	};

	// triggers when file is selected with click
	const handleChange = function (e) {
		e.preventDefault();
		if (e.target.files && e.target.files[0]) {
			// handleFiles(e.target.files);
		}
	};

	// triggers the input when the button is clicked
	const onButtonClick = () => {
		inputRef.current.click();
	};

	return (
		<div id="form-file-upload" onDragEnter={handleDrag}>
			<input
				ref={inputRef}
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
				<div>
					<p>Drag and drop your file here or</p>
					<button className="upload-button" onClick={onButtonClick}>
						Upload a file
					</button>
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
	);
};

export default ImageDragUpload;
