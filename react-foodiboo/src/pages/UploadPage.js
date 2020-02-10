import React, { useState } from "react";
import EXIF from "exif-js";
import dms2dec from "dms2dec";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import Test from "../images/test.JPG";
import Test2 from "../images/test2.jpg";

import {
  Button,
  Form,
  Card,
  FormGroup,
  FormControl,
  input
} from "react-bootstrap";

// import axios from "axios";
// import { toast } from "react-toastify";

const UploadPage = ({ google }) => {
  let fileInput = React.createRef();

  const [imageFile, setImageFile] = useState(null);
  // const [HandleFile, setHandleFile] = useState();
  const [message, setMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const [x, setX] = useState(3.1347584722222224);
  const [y, setY] = useState(101.62975277777777);

  const mapStyles = {
    width: "100%",
    height: "100%"
  };

  const ImageInformation = e => {
    const img = e.target;
    EXIF.getData(img, function() {
      let lattitude = EXIF.getTag(img, "GPSLatitude");
      let lattitudeRef = EXIF.getTag(img, "GPSLatitudeRef");
      let longtitude = EXIF.getTag(img, "GPSLongitude");
      let longtitudeRef = EXIF.getTag(img, "GPSLongitudeRef");

      let lattitudePos = `${parseFloat(lattitude[0])}°${parseFloat(
        lattitude[1]
      )}'${parseFloat(lattitude[2])}″${lattitudeRef}`;

      let longtitudePos = `${parseFloat(longtitude[0])}°${parseFloat(
        longtitude[1]
      )}'${parseFloat(longtitude[2])}″${longtitudeRef}`;

      // console.log(lattitudePos);
      // console.log(longtitudePos);
      // console.log(`${lattitudePos} ${longtitudePos}`);

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
      console.log(geoPositionDD);
      let lattitudeDD = geoPositionDD[0];
      let longtitudeDD = geoPositionDD[1];
      console.log(lattitudeDD);
      console.log(longtitudeDD);
    });
  };

  //   const SubmitImage = e => {
  //     e.preventDefault();
  //     let JWT = localStorage.getItem("jwt");
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
      <Map
        google={google}
        zoom={19}
        style={mapStyles}
        initialCenter={{ lat: x, lng: y }}
      >
        <Marker position={{ lat: x, lng: y }} />
      </Map>
      <div style={{ display: "none" }}>
        <div
          style={{
            backgroundColor: "lightblue",
            height: "100vh",

            display: "flex"
          }}
        >
          <Card
            style={{
              width: "100%",
              maxHeight: "100%",

              marginTop: "85px"
            }}
          >
            <button
              style={{
                borderRadius: "50%",
                padding: "1em",
                height: "65px",
                width: "65px",
                position: "absolute",
                bottom: "50px",
                right: "50vw"
              }}
              onClick={() => {
                fileInput.current.click();
              }}
            ></button>
            {/* <Form onSubmit={SubmitImage}> */}
            <Form>
              <FormGroup>
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
                <input
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
                />
              </FormGroup>
            </Form>
            <div className="card">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="previewimg"
                  height="100%"
                  width="100%"
                  style={{ transform: "rotate(90deg)" }}
                />
              ) : (
                <div style={{ position: "absolute", right: "50vw" }}>
                  {message ? message : "Take a picture!"}
                </div>
              )}
            </div>
            <Button
              type="submit"
              color="primary"
              style={{
                position: "absolute",
                right: "50px",
                bottom: "50px",
                borderRadius: "50%"
              }}
            >
              <span>&#10003;</span>
            </Button>
          </Card>
          <img
            src={Test}
            style={{ width: "250px", height: "250px" }}
            onClick={ImageInformation}
          ></img>
          <img
            src={Test2}
            style={{ width: "250px", height: "250px" }}
            onClick={ImageInformation}
          ></img>
        </div>
      </div>
    </>
  );
};
// export default UploadPage;

export default GoogleApiWrapper({
  apiKey: "AIzaSyDctpk36CsKzJFeEU6Fev5H8tM1Ls2b15Q"
})(UploadPage);
