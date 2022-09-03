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
import { Link } from "react-router-dom";

const BlogForm = () => {
  const [formState, setFormState] = useState({
    blogTitle: "",
    blogDescription: "",
    blogText: "",
    blogImage: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [addBlog] = useMutation(ADD_BLOG, {
    update(cache, { data: { addBlog } }) {

          // update me array's cache
          const { me } = cache.readQuery({ query: QUERY_ME });
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: { ...me, blogs: [...me.blogs, addBlog] } },
          });

          // update blog array's cache
          const { blogs } = cache.readQuery({ query: QUERY_BLOGS });
          cache.writeQuery({
            query: QUERY_BLOGS,
            data: { blogs: [addBlog, ...blogs] },
          });
        }
      });
      

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
       await addBlog({
        variables: { ...formState },
      });

      setFormState({ 
        blogTitle: "",
        blogDescription: "",
        blogText: "",
        blogImage: "", });
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
      formState.blogImage = result.info.url;
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
              <Form.Control
                className="formBack"
                placeholder="26 characters max"
                name="blogTitle"
                type="blogTitle"
                maxLength="26"
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
              maxLength="100"
              placeholder="100 characters max"
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

            <img id="uploadedimage" name="blogImage"  placeholder="" alt={""} src="">
            </img>

          </InputGroup>


          {errorMessage && (
            <div>
              <p className="error-text">{errorMessage}</p>
            </div>
          )}
          {/* <Link to="/" > */}
          <Button className="AllBtn FormBtn" type="submit" onClick={handleFormSubmit}>
            Create Blog
          </Button>
          {/* </Link> */}


          <Button className="AllBtn FormBtn" type="button" onClick={showWidget}>
            Upload Photo
          </Button>
        </Form>
      </Container>
  );
};

export default BlogForm;