import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import EXIF from "exif-js";
import dms2dec from "dms2dec";
import ExifOrientationImg from "react-exif-orientation-img";
import { Link } from "react-router-dom";

import arrow from "../../src/images/arrow.png";
import close from "../../src/images/close.png";

const UploadPage = ({
  google,
  imageFile,
  setImageFile,
  previewImage,
  setPreviewImage
}) => {
  let fileInput = React.createRef();

  const [lat, setLat] = useState(null);
  const [lngt, setLngt] = useState(null);

  // const [showMap, setShowMap] = useState(false);

  const imageGeolocation = e => {
    const img = e;
    EXIF.getData(img, function() {
      let lattitude = EXIF.getTag(img, "GPSLatitude");
      let lattitudeRef = EXIF.getTag(img, "GPSLatitudeRef");
      let longtitude = EXIF.getTag(img, "GPSLongitude");
      let longtitudeRef = EXIF.getTag(img, "GPSLongitudeRef");
      let test = EXIF.getTag(img, "Orientation");

      // GEO LOCATION DMS FORMAT
      // let lattitudePos = `${parseFloat(lattitude[0])}°${parseFloat(
      //   lattitude[1]
      // )}'${parseFloat(lattitude[2])}″${lattitudeRef}`;

      // let longtitudePos = `${parseFloat(longtitude[0])}°${parseFloat(
      //   longtitude[1]
      // )}'${parseFloat(longtitude[2])}″${longtitudeRef}`;

      // console.log(lattitudePos);
      // console.log(longtitudePos);
      // console.log(`${lattitudePos} ${longtitudePos}`);

      // GEO LOCATION DD FORMAT
      let geoPositionDD = dms2dec(
        [
          parseFloat(lattitude[0]),
          parseFloat(lattitude[1]),
          parseFloat(lattitude[2])
        ],
        lattitudeRef,
        [
          parseFloat(longtitude[0]),
          parseFloat(longtitude[1]),
          parseFloat(longtitude[2])
        ],
        longtitudeRef
      );
      // console.log(geoPositionDD);
      let lattitudeDD = geoPositionDD[0];
      let longtitudeDD = geoPositionDD[1];
      // console.log(lattitudeDD);
      // console.log(longtitudeDD);
      setLat(lattitudeDD);
      setLngt(longtitudeDD);
      console.log(test);
    });
  };

  console.log(lat);
  console.log(lngt);

  //   const SubmitImage = e => {
  //     e.preventDefault();
  //     let JWT = localStorage.getItem("JWT");
  //     let formData = new FormData();

  //     formData.append("image", imageFile);

  //     console.log(formData);

  //     axios
  //       .post("https://insta.nextacademy.com/api/v1/images/", formData, {
  //         headers: { Authorization: `Bearer ${JWT}` }
  //       })
  //       .then(response => {
  //         if (response.data.success) {
  //           toast.info("Image uploaded!", {
  //             position: "bottom-center",
  //             autoClose: 4000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true
  //           });
  //           setImageFile(null);
  //           setPreviewImage(null);
  //           setMessage("Image Uploaded Successfully!");
  //         }
  //       })
  //       .catch(error => {
  //         console.log(error.response);
  //       });
  //   };

  useEffect(() => {
    if (previewImage !== null) {
      // console.log();
      imageGeolocation(imageFile);
    }
  }, [previewImage]);
  return (
    <>
      <div className="close_button_container">
        <Link to="/">
          <div className="x_button">X</div>
        </Link>
        {/* <img src={close} className="close_button"></img> */}
      </div>

      {/* <CustomInput
              type="file"
              id="exampleCustomFileBrowser"
              name="image-file"
              label="choose an image file"
              onChange={e => {
                setImageFile(e.target.files[0]);
                setPreviewImage(URL.createObjectURL(e.target.files[0]));
              }}
            /> */}
      {/* <input
              style={{display: 'none'}}
              ref={fileInput}
              capture
              type="file"
              accept="image/*"
              name="image-file"
              onChange={e => {
                setImageFile(e.target.files[0]);
                setPreviewImage(URL.createObjectURL(e.target.files[0]));
              }}
            /> */}

      {previewImage ? (
        <div className="upload_image_container">
          <ExifOrientationImg
            className="upload_image"
            src={previewImage}
            alt="previewimg"
            onClick={imageGeolocation}
          />
          <div className="arrow_container">
            {/* <div className="meal_container">Enjoy your meal</div> */}
            {/* <img src={arrow} className="arrow_icon"></img> */}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default UploadPage;

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyDctpk36CsKzJFeEU6Fev5H8tM1Ls2b15Q"
// })(UploadPage);
