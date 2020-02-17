import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Route } from "react-router-dom";

import UploadPage from "./pages/UploadPage.js";
import Homepage from "./pages/Homepage.js";
import Navbar from "./components/Navbar.js";
import CameraBar from "./components/CameraBar.js";
import RatingPage from "./components/RatingPage.js";
import FoodPage from "./components/FoodPage.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("JWT") !== null
  );

  const [imageFile, setImageFile] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [foods, setFoods] = useState([]);

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
        <Route path="/FoodPage/:foodname/:id">
          <FoodPage foods={foods} />
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
