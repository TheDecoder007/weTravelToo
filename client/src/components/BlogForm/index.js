import React, { useState } from "react";
import './style.css';
import { useMutation } from "@apollo/client";
import { ADD_BLOG } from "../../utils/mutations";
import { QUERY_BLOGS, QUERY_ME } from '../../utils/queries';
// import { validateEmail } from "../../assets/utils/helpers";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
// import Nav from "react-bootstrap/Nav";


const BlogForm = () => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    body: "",
    img: "",
  });
  const [characterCount, setCharacterCount] = useState(0);

  const { title, description, body } = formState;
  const [errorMessage, setErrorMessage] = useState("");

  const [addBlog, { error }] = useMutation(ADD_BLOG, {
    update(cache, { data: { addBlog } }) {
  
        // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, blogs: [...me.blogs, addBlog] } },
        });
      } catch (e) {
        console.warn("First thought insertion by user!")
      }
  
      // update thought array's cache
      const { blogs } = cache.readQuery({ query: QUERY_BLOGS });
      cache.writeQuery({
        query: QUERY_BLOGS,
        data: { blogs: [addBlog, ...blogs] },
      });
    }
  });

  const handleChange = (event) => {
    if (event.target.value.length <= 140) {
        setFormState(event.target.value);
        setCharacterCount(event.target.value.length);
      }
      if (!event.target.value.length) {
        setErrorMessage(`${event.target.name} is required.`);
      } else {
        setErrorMessage("");
      }
    if (!errorMessage) {
      setFormState({ ...formState, [event.target.name]: event.target.value });
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add thought to database
      await addBlog({
        variables: { title, description, body },
      });

      // clear form value
      setFormState("");
      setCharacterCount(0);
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
        <div>
        <h3 className="text-center sectionHead">Write Your Blog</h3>
        
        </div>
        <Row>
          <Col>
            <Form.Control
              className="formBack"
              type="text"
              defaultValue={title}
              onBlur={handleChange}
              name="title"
              placeholder="Blog Title"
            />
          <br/>
          </Col>
        </Row>
        <InputGroup>
          <InputGroup.Text className="formText">Description</InputGroup.Text>
          <Form.Control
            className={`formBack ${characterCount === 140 || error ? "text-error" : ""}`}
          >
            Character Count: {characterCount}/140
            {error && <span className="ml-2">Something went wrong...</span>}
            as="textarea"
            aria-label="With textarea"
            name="description"
            defaultValue={description}
            onBlur={handleChange}
            rows="3"
            </Form.Control>

        </InputGroup>
        <br/>
        <InputGroup>
          <InputGroup.Text className="formText">Your Blog</InputGroup.Text>
          <Form.Control
          className="formBack"
            as="textarea"
            aria-label="With textarea"
            name="body"
            defaultValue={body}
            onBlur={handleChange}
            rows="10"
          />
        </InputGroup>
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
        <Button className="AllBtn FormBtn" variant="primary" type="submit">
          Submit
        </Button>
        
        <Button className="AllBtn FormBtn" variant="primary" type="submit">
          Upload Photo
        </Button>
      </Form>
    </Container>
  );
}

export default BlogForm;