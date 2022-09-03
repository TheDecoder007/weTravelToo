import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);
  const [errorMessage, setErrorMessage] = useState("");

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (!event.target.value) {
      setErrorMessage(`${event.target.name} is required.`);
    } else {
      setErrorMessage("");
    }
    if (!errorMessage) {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form id="BlogForm" onSubmit={handleFormSubmit} style={{}}>
        <Row className="sectionTopRow">
          <h3 className="text-center sectionHead">Sign Up</h3>
        </Row>
        <Row>
          <Col>
            <Form.Label className="LoginHead">Username</Form.Label>

            <Form.Control
              className="formBack"
              placeholder="Your username"
              name="username"
              type="username"
              id="username"
              value={formState.username}
              onChange={handleChange}
            />
            <br />
          </Col>
        </Row>
          <Form.Group>
          <Form.Label className="LoginHead">Email</Form.Label>
          <Form.Control
            className="formBack"
            placeholder="Your Email"
            name="email"
            type="email"
            id="email"
            value={formState.email}
            onChange={handleChange}
          
            />
            </Form.Group> 
        <br/>

          <Form.Label className="LoginHead">Password</Form.Label>
          <Form.Control
            controllId = "formPlaintextPassword"
            className="formBack"
            placeholder="Enter Password"
            name="password"
            type="password"
            id="password"
            value={formState.password}
            onChange={handleChange}
          />
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
        <Button className="AllBtn SignBtn" type="submit">
          Sign Up!
        </Button>
        <Link to="/">
        <Button className="AllBtn SignBtn">Go Back
        </Button>
        </Link>
      </Form>
        {error && <div>Signup failed</div>}
    </Container>
  );
};

export default Signup;
