import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Route } from "react-router-dom";

import UploadPage from "./pages/UploadPage.js";
import Homepage from "./pages/Homepage.js";
import Navbar from "./components/Navbar.js";
import CameraBar from "./components/CameraBar.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import RatingPage from "./components/RatingPage.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("JWT") !== null
  );

  const [imageFile, setImageFile] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [foods, setFoods] = useState([
    {
      id: 1,
      food_name: "Nasi Lemak",
      food_image:
        "http://www.friedchillies.com/images/uploads/reviews/NasiLemakAngah_Kerang.jpg",
      latitude: 3.1347416666666668,
      longtitude: 101.62975277777777
    },
    {
      id: 2,
      food_name: "Pan Mee",
      food_image:
        "https://i0.wp.com/penangfoodie.com/wp-content/uploads/2018/07/wassupjanice.png?resize=995%2C986",
      latitude: 3.1347584722222224,
      longtitude: 101.62996738888889
    },
    {
      id: 3,
      food_name: "Chicken Rice",
      food_image:
        "https://ucarecdn.com/f6a84197-bea2-4aa4-bedb-9635f8d4482c/-/scale_crop/1600x900/center/-/quality/normal/-/format/webp/roasted-chicken-rice.webp",
      latitude: 3.134666833333333,
      longtitude: 101.62899752777777
    }
  ]);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Navbar
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        setFoods={setFoods}
      />

      <Switch>
        <Route exact path="/">
          <Homepage foods={foods} setFoods={setFoods} />
        </Route>
        <Route exact path="/uploadPage">
          <UploadPage
            imageFile={imageFile}
            setImageFile={setImageFile}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
          />
        </Route>
        
        
        <Route exact path="/RatingPage">
          <RatingPage />
        </Route>

       
      </Switch>
      <CameraBar
        imageFile={imageFile}
        setImageFile={setImageFile}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
      />
    </>
  );
}

export default App;
