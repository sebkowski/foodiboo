import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const LoginForm = ({ toggleForm, closeModal, setLoggedIn }) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  let history = useHistory();
  function submitsignin(e) {
    e.preventDefault();

    console.log(username, password);
    axios({
      method: "post",
      url: "https://foodiboo.herokuapp.com/api/v1/sessions/login",
      data: {
        name: username,
        password: password
      }
    })
      .then(response => {
        setLoggedIn(true);
        console.log(response.data);
        localStorage.setItem("username", response.data.user.name);
        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("id", response.data.user.id);

        history.push("/");

        closeModal(true);
      })

      .catch(error => {
        console.error(error.response.data.err);
      });
  }

  return (
    <>
      <Modal.Body>
        <Form id="login-form" onSubmit={submitsignin}>
          <Form.Group controlId="formBasicUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={username}
              onChange={e => {
                setusername(e.target.value);
              }}
              type="UserName"
              placeholder="Enter your username"
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={e => {
                setpassword(e.target.value);
              }}
              type="Password"
              placeholder="Enter your password"
            />
          </Form.Group>
        </Form>
        <div>Need an account?</div>
        <Button onClick={toggleForm}>Sign Up</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <input
          form="login-form"
          className="btn btn-primary"
          type="submit"
          variant="primary"
          value="Log In"
          disabled={username === "" || password === "" || password.length < 8}
        />
      </Modal.Footer>
    </>
  );
};

export default LoginForm;
