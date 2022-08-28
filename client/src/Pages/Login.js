import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form id="BlogForm" onSubmit={handleFormSubmit}>
        <Row className="sectionTopRow">
          <h3 className="text-center sectionHead">Login</h3>
        </Row>
        <Row>
          <Col>
            <Form.Label className="LoginHead">Username</Form.Label>
            <Form.Control
              className="formBack"
              placeholder="Your email"
              name="email"
              type="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
            />
            <br />
          </Col>
        </Row>

        <Form.Group>
          <Form.Label className="LoginHead">Password</Form.Label>
          <Form.Control
            className="formBack"
            placeholder="Enter Password"
            name="password"
            type="password"
            id="password"
            value={formState.password}
            onChange={handleChange}
          />
        </Form.Group>
        <br />
        <Button className="AllBtn SignBtn" type="submit">
          Submit
        </Button>
        <Button className="AllBtn SignBtn" href="/">
          Go Back
        </Button>
      </Form>
      {error && <div>Login failed</div>}
    </Container>
  );
};

export default Login;
