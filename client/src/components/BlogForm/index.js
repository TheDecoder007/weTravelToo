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

  const { blogTitle, blogDescription, blogText, blogImage } = formState;
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
        variables: { blogTitle, blogDescription, blogText, blogImage },
      });

      // clear form value
      setFormState("");
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
      <Form id="BlogForm" onSubmit={handleFormSubmit} style={{}}>    
      <br/>
        <Row>
          <Col>
        <h4 className="formHead">Title</h4>
            <Form.Control
              className="formBack"
              type="text"
              defaultValue={blogTitle}
              onBlur={handleChange}
              name="title"
              placeholder="Blog Title"
            />
          <br/>
          </Col>
        </Row>
          <h4 className="formHead">Description</h4>
        <InputGroup>
          <Form.Control
            className="formBack" 
             as="textarea"
            aria-label="With textarea"
            name="description"
            defaultValue={blogDescription}
            onBlur={handleChange}

            rows="2"
            maxLength="140"
            placeholder="140 characters max"
            />

        </InputGroup>

        <br/>
        <h4 className="formHead">Your Blog</h4>
        <InputGroup>
          <Form.Control
          className="formBack"
            as="textarea"
            aria-label="With textarea"
            name="body"
            defaultValue={blogText}
            onBlur={handleChange}
            rows="10"
            />

            <img id="uploadedimage" defaultValue={blogImage} src="">
    </img>


        </InputGroup>

        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
        <Button className="AllBtn FormBtn" onClick={handleFormSubmit} type="submit">
          Submit
        </Button>

        
        <Button className="AllBtn FormBtn" variant="primary"  onClick={showWidget}>

          Upload Photo
        </Button>
      </Form>
     </Container>
  );
}

export default BlogForm;