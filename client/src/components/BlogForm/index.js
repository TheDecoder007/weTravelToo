import React, { useState } from "react";
import './style.css';
import { useMutation } from "@apollo/client";
import { ADD_BLOG } from "../../utils/mutations";
import { QUERY_BLOGS, QUERY_ME } from '../../utils/queries';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";




const BlogForm = () => {
  const [formState, setFormState] = useState({
    blogTitle: "",
    blogDescription: "",
    blogText: "",
    blogImage: "",
  });
  const [addBlog, { error }] = useMutation(ADD_BLOG);
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
      const { data } = await addBlog({
        variables: { ...formState },
      });

      
    } catch (e) {
      console.error(e);
    }
  };

  const showWidget = () => {
    
    let widget = window.cloudinary.createUploadWidget({ 
       cloudName: `dfe8l6xnx`,
       uploadPreset: `weTravel`,
       sources: [ "local", "url", 'instagram', 'unsplash'],
       cropping: true}, 
    (error, result) => {
      if (!error && result && result.event === "success") { 
      console.log(result.info.url); 
      document
        .getElementById("uploadedimage")
        .setAttribute("src", result.info.secure_url);
    }});
    widget.open()
  }

  return (
<Container fluid className="CreateCont"

      >
        <Form id="BlogForm" onSubmit={handleFormSubmit} >
          <br />
          <Row>
            <Col>
              <h4 className="formHead">Title</h4>
              <input
                className="formBack"
                placeholder="Blog Title"
                name="blogTitle"
                type="blogTitle"
                value={formState.blogTitle}
                onChange={handleChange}
              />
              <br />
            </Col>
          </Row>
          <h4 className="formHead">Description</h4>
          <InputGroup>
            <Form.Control
              className="formBack"
              as="textarea"
              aria-label="With textarea"
              name="blogDescription"
              rows="2"
              maxLength="140"
              placeholder="140 characters max"
              value={formState.blogDescription}
              onChange={handleChange}
            />

          </InputGroup>

          <br />
          <h4 className="formHead">Your Blog</h4>
          <InputGroup>
            <Form.Control
              className="formBack"
              as="textarea"
              aria-label="With textarea"
              name="blogText"
              value={formState.blogText}
              onChange={handleChange}
              rows="10"
            />

            <img id="uploadedimage" name="blogImage" value={formState.blogImage} alt={"blog"} src="">
            </img>


          </InputGroup>

          {errorMessage && (
            <div>
              <p className="error-text">{errorMessage}</p>
            </div>
          )}
          <Button className="AllBtn FormBtn" type="submit">
            Submit
          </Button>


          <Button className="AllBtn FormBtn" onClick={showWidget}>

            Upload Photo
          </Button>
        </Form>
      </Container>
  );
};

export default BlogForm;