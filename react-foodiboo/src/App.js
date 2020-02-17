import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Route } from "react-router-dom";

import UploadPage from "./pages/UploadPage.js";
import Homepage from "./pages/Homepage.js";
import Navbar from "./components/Navbar.js";
import CameraBar from "./components/CameraBar.js";
import RatingPage from "./components/RatingPage.js";
import FoodPage from "./components/FoodPage.js";
import ContactPage from "./components/ContactPage.js";
import ProfilePage from "./components/ProfilePage.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  const [showMap, setShowMap] = useState([]);

  const openMap = (latit, longt) => {
    setShowMap([latit, longt]);
  };

  const closeMap = () => {
    setShowMap([]);
  };

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("JWT") !== null
  );

  const [imageFile, setImageFile] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [finalRating, setFinalRating] = useState([]);
  const [y1, setY1] = useState(100);
  const [y2, setY2] = useState(100);
  const [y3, setY3] = useState(100);
  const [y4, setY4] = useState(100);
  const [y5, setY5] = useState(100);

  const currentUser = localStorage.getItem("username");

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
        currentUser={currentUser}
      />

      <Switch>
        <Route exact path="/">
          <Homepage
            foods={foods}
            setFoods={setFoods}
            showMap={showMap}
            setShowMap={setShowMap}
            openMap={openMap}
            closeMap={closeMap}
          />
        </Route>
        <Route exact path="/HomePage">
          <Homepage foods={foods} setFoods={setFoods} />
        </Route>
        <Route exact path="/ProfilePage/:loggedInUser">
          <ProfilePage
            currentUser={currentUser}
            foods={foods}
            setFoods={setFoods}
            showMap={showMap}
            setShowMap={setShowMap}
            openMap={openMap}
            closeMap={closeMap}
          />
        </Route>
        <Route exact path="/uploadPage">
          <UploadPage
            loading={loading}
            setLoading={setLoading}
            imageFile={imageFile}
            setImageFile={setImageFile}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            y1={y1}
            y2={y2}
            y3={y3}
            y4={y4}
            y5={y5}
            setY1={setY1}
            setY2={setY2}
            setY3={setY3}
            setY4={setY4}
            setY5={setY5}
          />
        </Route>

        <Route exact path="/RatingPage">
          <RatingPage
            finalRating={finalRating}
            setFinalRating={setFinalRating}
            y1={y1}
            y2={y2}
            y3={y3}
            y4={y4}
            y5={y5}
            setY1={setY1}
            setY2={setY2}
            setY3={setY3}
            setY4={setY4}
            setY5={setY5}
          />
        </Route>

        <Route exact patch="/ContactPage">
          <ContactPage />
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
