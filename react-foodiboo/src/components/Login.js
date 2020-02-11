import React from "react";
import { Modal } from "react-bootstrap";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";

const Login = ({
  show,
  closeModal,
  openModal,
  loggedIn,
  setLoggedIn,
  showLogin,
  setShowLogin,
  setShowMenu
}) => {
  const toggleForm = () => setShowLogin(!showLogin);
  return (
    <>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{showLogin ? "Login" : "Sign Up"}</Modal.Title>
        </Modal.Header>
        {showLogin ? (
          <LoginForm
            toggleForm={toggleForm}
            closeModal={closeModal}
            setLoggedIn={setLoggedIn}
          />
        ) : (
          <SignUpForm
            setShowLogin = {setShowLogin}
            closeModal={closeModal}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            setShowMenu = {setShowMenu}
            toggleForm= {toggleForm}
          />
        )}
      </Modal>
    </>
  );
};

export default Login;
