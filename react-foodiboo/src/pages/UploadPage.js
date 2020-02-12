import React, { useState } from "react";
import EXIF from "exif-js";
import dms2dec from "dms2dec";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import Test from "../images/test.JPG";
import Test2 from "../images/test2.jpg";

// import {
//   Button,
//   Form,
//   Card,
//   FormGroup,
//   FormControl,
//   input
// } from "react-bootstrap";

// import axios from "axios";
// import { toast } from "react-toastify";

const UploadPage = ({
  google,
  imageFile,
  setImageFile,
  previewImage,
  setPreviewImage
}) => {
  let fileInput = React.createRef();

  // const [imageFile, setImageFile] = useState(null);
  // const [HandleFile, setHandleFile] = useState();
  // const [message, setMessage] = useState("");
  // const [previewImage, setPreviewImage] = useState(null);

  const [x, setX] = useState(3.1347584722222224);
  const [y, setY] = useState(101.62975277777777);

  const [showMap, setShowMap] = useState(false);

  const openMap = () => {
    setShowMap(!showMap);
    console.log(showMap);
  };

  // const mapStyles = {
  //   // position: "fixed",
  //   // transform: "translate(-50%,-50%)",
  //   width: "500px",
  //   height: "500px",
  //   margin: "20vh 0 0 10vw",
  //   border: "1px solid black"
  // };

  const imageGeolocation = e => {
    const img = e.target;
    EXIF.getData(img, function() {
      let lattitude = EXIF.getTag(img, "GPSLatitude");
      let lattitudeRef = EXIF.getTag(img, "GPSLatitudeRef");
      let longtitude = EXIF.getTag(img, "GPSLongitude");
      let longtitudeRef = EXIF.getTag(img, "GPSLongitudeRef");

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
      console.log(lattitudeDD);
      console.log(longtitudeDD);
    });
  };

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
  return (
    <>
      {/* <button
        style={{
          // borderRadius: "50%",
          // padding: "1em",
          height: "65px",
          width: "65px",
          position: "absolute",
          transform: "translate(-50%,-50%)",
          bottom: "0%",
          left: "50%"
        }}
        onClick={() => {
          fileInput.current.click();
        }}
      ></button> */}

      {/* <Form onSubmit={SubmitImage}> */}

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
      {/* <input
        ref={fileInput}
        accept="image/*"
        capture
        style={{ width: "0%" }}
        type="file"
        className="form-control-file"
        name="image-file"
        multiple={false}
        onChange={e => {
          setImageFile(e.target.files[0]);
          setPreviewImage(URL.createObjectURL(e.target.files[0]));
        }}
      /> */}

      {previewImage ? (
        <img
          src={previewImage}
          alt="previewimg"
          height="100%"
          width="100%"
          style={{ transform: "rotate(90deg)" }}
        />
      ) : null}
    </>
  );
};
// export default UploadPage;

export default GoogleApiWrapper({
  apiKey: "AIzaSyDctpk36CsKzJFeEU6Fev5H8tM1Ls2b15Q"
})(UploadPage);
