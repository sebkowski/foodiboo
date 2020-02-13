import React, { useState } from "react";
import "../../src/Navbar.css";
import { toast } from "react-toastify";
import { Link, useHistory, Route, useLocation } from "react-router-dom";
import Login from "./Login";

const Navbar = ({ loggedIn, setLoggedIn }) => {
  let history = useHistory();
  let location = useLocation();

  const [login, setlogin] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  // console.log(localStorage.getItem("id"), "ID");
  // console.log(localStorage.getItem("username"), "USERNAME");
  // console.log(localStorage.getItem("JWT"), "JWT");

  // console.log("is user logged in 1: ", loggedIn);
  // console.log("is user logged in 2: ", localStorage.getItem("JWT") !== null);

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
            <input type="text" placeholder="Search Food..." id="search_bar" />
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
