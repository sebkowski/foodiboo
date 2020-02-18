import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import cameraIcon from "../../src/images/camera.png";

const CameraBar = ({
  imageFile,
  setImageFile,
  previewImage,
  setPreviewImage
}) => {
  let location = useLocation();
  let fileInput = React.createRef();

  const saveImage = e => {
    setImageFile(e.target.files[0]);
    console.log(URL.createObjectURL(e.target.files[0]));
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    e.target.value = "";
  };

  return (
    <>
      {location.pathname === "/UploadPage" ? (
        <div id="camera_bar_active">
          <div
            className="camera_button_active"
            onClick={() => fileInput.current.click()}
          ></div>
        </div>
      ) : (
        <div id="camera_bar">
          <Link
            to="/UploadPage"
            className="camera_button"
            onClick={() => {
              fileInput.current.click();
            }}
          >
            {/* <img src={cameraIcon} className="camera_icon" /> */}
          </Link>
        </div>
      )}
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
        onChange={saveImage}
      />
    </>
  );
};
export default CameraBar;
