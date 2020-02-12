import React, { useState } from "react";
import "../ressources/CameraBar.css";
import { Link } from "react-router-dom";

const CameraBar = ({
  imageFile,
  setImageFile,
  previewImage,
  setPreviewImage
}) => {
  let fileInput = React.createRef();
  const saveImage = e => {
    // console.log(e.target.files[0]);
    setImageFile(e.target.files[0]);
    console.log(URL.createObjectURL(e.target.files[0]));
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <>
      <div id="camera_bar">
        <Link
          to="/UploadPage"
          className="camera_button"
          onClick={() => {
            fileInput.current.click();
          }}
        />
        <input
          ref={fileInput}
          accept="image/*"
          capture
          style={{ width: "0%" }}
          type="file"
          id="image"
          className="form-control-file"
          name="image-file"
          multiple={false}
          // onChange={e => {
          //   console.log(e.target.files[0]);
          //   setImageFile(e.target.files[0]);
          //   // setPreviewImage(URL.createObjectURL(e.target.files[0]));
          // }}
          onChange={saveImage}
        />

        {/* {previewImage ? (
          <img src={previewImage} alt="previewimg" height="100%" width="100%" />
        ) : null} */}
      </div>
    </>
  );
};
export default CameraBar;
