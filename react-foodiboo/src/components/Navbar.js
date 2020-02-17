import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useHistory, Route, useLocation, Redirect } from "react-router-dom";
import Login from "./Login";
import axios from "axios";
import FoodibooLogo from "./foodibooLogo";
import FoodibooIcon from "./fodibooIcon";

const Navbar = ({ loggedIn, setLoggedIn, foods, setFoods }) => {
  let history = useHistory();
  let location = useLocation();

  const [login, setlogin] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [searchBoxValue, setSearchBoxValue] = useState("");

  // console.log(localStorage.getItem("id"), "ID");
  // console.log(localStorage.getItem("username"), "USERNAME");
  // console.log(localStorage.getItem("JWT"), "JWT");

  // console.log("is user logged in 1: ", loggedIn);
  // console.log("is user logged in 2: ", localStorage.getItem("JWT") !== null);

  const searchFoods = e => {
    e.preventDefault();
    console.log(searchBoxValue);
    setSearchBoxValue("");
    axios({
      method: "get",
      url: `https://foodiboo.herokuapp.com/api/v1/food_dishes/${searchBoxValue}`
    })
      .then(response => {
        console.log(response.data);
        console.log(response.data.first_review_food_pic);
        console.log(response.data.food_id_arr);
        console.log(response.data.average_c1);
        let foodsContentArr = [];
        let i;
        for (i = 0; i < response.data.food_id_arr.length; i++) {
          let foodsContentObj = {
            id: response.data.food_id_arr[i],
            food_name: searchBoxValue,
            food_image: response.data.first_review_food_pic[i],
            average_c1: response.data.average_c1[i],
            average_c2: response.data.average_c2[i],
            average_c3: response.data.average_c4[i],
            average_c4: response.data.average_c5[i],
            average_c5: response.data.average_c5[i],
            latitude: response.data.food_latitude_arr[i],
            longtitude: response.data.food_longitude_arr[i],
            price: response.data.food_price_arr[i]
          };
          foodsContentArr.push(foodsContentObj);
        }
        setFoods(foodsContentArr);
      })
      .catch(error => {
        console.log(error.response.data.err);
        // set error message here
      });
  };

  const closeModal = () => {
    setlogin(false);
  };
  const openModal = () => {
    if (loggedIn) {
      localStorage.clear();
      setLoggedIn(false);
      setlogin(false);
      history.push("/");
    } else {
      setlogin(true);
    }
  };

  const toggleNav = () => {
    setShowMenu(!showMenu);
  };

  

  return (
    <>
      {login && (
        <Login
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          show={login}
          closeModal={closeModal}
          openModal={openModal}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          setShowMenu={setShowMenu}
        />
      )}

      {location.pathname === "/UploadPage" ? null : (
        <>
          <nav id="navbar">
            <Link style={{marginTop:"20px"}} to="/homePage" className="logo_link">
            <FoodibooLogo className="foodiboo_logo" />
            </Link>

            <form onSubmit={searchFoods}>
              {location.pathname === "/" ? (
                <input
                  type="text"
                  placeholder="Search Food.."
                  id="search_bar"
                  value={searchBoxValue}
                  onChange={e => {
                    setSearchBoxValue(e.target.value);
                  }}
                />
              ) : null}
            </form>
          </nav>
          <div className="hamburger_clicker" onClick={toggleNav}></div>
          <div className={showMenu ? "hamburger active" : "hamburger"}>
            <div className="burger"></div>
          </div>
        </>
      )}

      <div
        id="hidden_container"
        style={{
          width: showMenu ? "100%" : 0
        }}
      >
        <div className="hidden_nav_contents">
          <div className="hidden_nav_title">Profile</div>
          <div className="hidden_nav_title">Settings</div>
          <div className="hidden_nav_title">Contact</div>
          <div className="hidden_nav_title">
            <div
              onClick={openModal}
              style={{
                display: "inlineBlock",
                cursor: "pointer",
                textAlign: "center",
                verticalAlign: "center",
                color: "white"
              }}
            >
              {localStorage.getItem("JWT") !== null ? "Sign Out" : "Sign In"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
