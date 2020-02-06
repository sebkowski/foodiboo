
import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import "./App.css";
import Homepage from "./pages/Homepage.js";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar.js";
// import { ToastContainer } from "react-toastify";

// import UploadPage from "./pages/UploadPage";


function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "Nasi Lemak",
      profileImage:
        "http://www.friedchillies.com/images/uploads/reviews/NasiLemakAngah_Kerang.jpg"
    },
    {
      id: 2,
      username: "Pan Mee",
      profileImage:
        "https://i0.wp.com/penangfoodie.com/wp-content/uploads/2018/07/wassupjanice.png?resize=995%2C986"
    },
    {
      id: 3,
      username: "Chicken Rice",
      profileImage:
        "https://ucarecdn.com/f6a84197-bea2-4aa4-bedb-9635f8d4482c/-/scale_crop/1600x900/center/-/quality/normal/-/format/webp/roasted-chicken-rice.webp"
    }
  ]);

  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {users.map(user => (
          <li>
            {user.id}: {user.username}
            <img src={user.profileImage} style={{height:"250px", width:"250px"}}>

          </img>
          </li>
          
        ))}
      </ul>
    </div>
  );
}
export default App;