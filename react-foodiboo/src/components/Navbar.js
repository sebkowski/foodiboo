import React, { useState } from "react";
import "../../src/Navbar.css";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import Login from "./Login";

const Navbar = ({ loggedIn, setLoggedIn }) => {
  let history = useHistory();
  const [login, setlogin] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const closeModal = () => {
    setlogin(false);
  };

  const openModal = () => {
    setlogin(true);
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
      <nav id="navbar">
        {login ? null : (
          <span
            onClick={() => {
              setlogin(true);
              setShowLogin(true);
            }}
            style={{
              display: "inlineBlock",
              cursor: "pointer",
              textAlign: "center",
              verticalAlign: "center",
              marginLeft: "15px",

              color: "white"
            }}
          >
            Sign In
          </span>
        )}

        <input type="text" placeholder="Search Food..." id="search_bar" />
      </nav>
      <div className="hamburger_clicker" onClick={toggleNav}></div>
      <div className={showMenu ? "hamburger active" : "hamburger"}>
        <div className="burger"></div>
      </div>
      <div
        id="hidden_container"
        style={{
          width: showMenu ? "100%" : 0
        }}
      >
        <div className="hidden_nav_contents">
          <div className="hidden_nav_title">Profile</div>
          <div className="hidden_nav_title">Settings</div>
          <div className="hidden_nav_title">About</div>
          <div className="hidden_nav_title">Contact</div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
