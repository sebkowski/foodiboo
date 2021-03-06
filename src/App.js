import React, { useState, useEffect } from "react";
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

import Steak from "./images/Steak.JPG";
import Ramen from "./images/Ramen.JPG";
import NasiLemak from "./images/Nasi Lemak.JPG";
import ChickenRice from "./images/Chicken Rice.JPG";
import Marinara from "./images/Marinara.jpg";

// const getItemAsync = key => {
//   return Promise.resolve().then(function() {
//     return localStorage.getItem(key);
//   });
// };

// useEffect(() => {
//   console.log("getting jwt");
//   getItemAsync("JWT").then(jwt => {
//     setLoggedIn
//   });
//   console.log("end of function --test--");
// }, []);

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
  const [foods, setFoods] = useState([
    {
      id: 77,
      food_name: "Steak",
      food_image: Steak,
      average_c1: 5,
      average_c2: 3,
      average_c3: 3,
      average_c4: 5,
      average_c5: 5,
      latitude: 3.150312,
      longtitude: 101.652398,
      price: 45
    },
    {
      id: 87,
      food_name: "Marinara meatball",
      food_image: Marinara,
      average_c1: 3,
      average_c2: 5,
      average_c3: 5,
      average_c4: 4,
      average_c5: 3,
      latitude: 3.13471375,
      longtitude: 101.62669477777777,
      price: 22
    },
    {
      id: 83,
      food_name: "Mee goreng",
      food_image: "https://foodiboo.s3.amazonaws.com/IMG_20200217_211440.jpg",
      average_c1: 3,
      average_c2: 2,
      average_c3: 3,
      average_c4: 2,
      average_c5: 2,
      latitude: 3.141776,
      longtitude: 101.628768,
      price: 7.5
    },
    {
      id: 74,
      food_name: "Chicken Rice",
      food_image: ChickenRice,
      average_c1: 4,
      average_c2: 4,
      average_c3: 2,
      average_c4: 3,
      average_c5: 3,
      latitude: 3.162569,
      longtitude: 101.582035,
      price: 10
    },
    {
      id: 80,
      food_name: "Lam mee",
      food_image:
        "https://foodiboo.s3.amazonaws.com/2020021805354715820041110987944899780380304768.jpg",
      average_c1: 3,
      average_c2: 4,
      average_c3: 3,
      average_c4: 5,
      average_c5: 5,
      latitude: 3.136111111111111,
      longtitude: 101.63,
      price: 14
    },
    {
      id: 76,
      food_name: "Ramen",
      food_image: Ramen,
      average_c1: 5,
      average_c2: 4,
      average_c3: 3,
      average_c4: 2,
      average_c5: 5,
      latitude: 3.071084,
      longtitude: 101.708105,
      price: 33
    }
  ]);
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

        <Route exact path="/ContactPage">
          <ContactPage />
        </Route>
        <Route path="/FoodPage/:foodname/:id">
          <FoodPage
            foods={foods}
            openMap={openMap}
            showMap={showMap}
            closeMap={closeMap}
          />
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
