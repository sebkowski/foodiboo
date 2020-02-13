import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Route } from "react-router-dom";

import UploadPage from "./pages/UploadPage.js";
import Homepage from "./pages/Homepage.js";
import Navbar from "./components/Navbar.js";
import CameraBar from "./components/CameraBar.js";

import "./App.css";
import "./Homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import StarRating from "./components/StarRating.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("JWT") !== null
  );
<<<<<<< HEAD
  const [foods, setFoods] = useState([
=======
  const [imageFile, setImageFile] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [foods, setfoods] = useState([
>>>>>>> 76f8e87c7a042bd78b2260c46ed3b80eb4b0c429
    {
      id: 1,
      food_name: "Nasi Lemak",
      food_image:
        "http://www.friedchillies.com/images/uploads/reviews/NasiLemakAngah_Kerang.jpg"
    },
    {
      id: 2,
      food_name: "Pan Mee",
      food_image:
        "https://i0.wp.com/penangfoodie.com/wp-content/uploads/2018/07/wassupjanice.png?resize=995%2C986"
    },
    {
      id: 3,
      food_name: "Chicken Rice",
      food_image:
        "https://ucarecdn.com/f6a84197-bea2-4aa4-bedb-9635f8d4482c/-/scale_crop/1600x900/center/-/quality/normal/-/format/webp/roasted-chicken-rice.webp"
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
<<<<<<< HEAD
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} foods={foods} setFoods={setFoods} />
=======
      <Navbar
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
      />
>>>>>>> 76f8e87c7a042bd78b2260c46ed3b80eb4b0c429

      <Switch>
        <Route exact path="/">
          <Homepage foods={foods} setFoods={setFoods}/>
        </Route>
        <Route exact path="/uploadPage">
          <UploadPage
            imageFile={imageFile}
            setImageFile={setImageFile}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
          />
        </Route>
        <Route exact path="/StarRating">
          <StarRating />
        </Route>

        {/* <Route exact path="/user/:id">
          <UserProfilePage />
        </Route> */}
        {/* <Route exact path="/profile" component={MyProfilePage}>
          <MyProfilePage />
        </Route> */}
        {/* <Route exact path="/uploadPage">
          <UploadPage />
        </Route> */}
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
