import React, { useState } from "react";
import "../../src/Navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleNav = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <nav id="navbar">
        <input type="text" placeholder="Search Food..." id="search_bar" />
      </nav>
      <div className={showMenu ? "hamburger active" : "hamburger"} onClick={toggleNav}>
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
