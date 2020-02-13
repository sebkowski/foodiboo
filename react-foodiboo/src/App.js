import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Route } from "react-router-dom";

import UploadPage from "./pages/UploadPage.js";
import Homepage from "./pages/Homepage.js";
import Navbar from "./components/Navbar.js";

import "./App.css";
import "./Homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import StarRating from "./components/StarRating.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("JWT") !== null
  );
  const [foods, setFoods] = useState([
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
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} foods={foods} setFoods={setFoods} />

      <Switch>
        <Route exact path="/">
          <Homepage foods={foods} setFoods={setFoods}/>
        </Route>
        <Route exact path="/uploadPage">
          <UploadPage />
          
        </Route>
        <Route exact path="/StarRating">
        
        
          <StarRating/>
          
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
    </>
  );
}

export default App;
