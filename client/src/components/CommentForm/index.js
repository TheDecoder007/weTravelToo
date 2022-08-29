import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";
import { QUERY_BLOGS, QUERY_ME, QUERY_COMMENTS } from '../../utils/queries';

const CommentForm = () => {
  const [formState, setFormState] = useState({
    body: "",
  });
  const [characterCount, setCharacterCount] = useState(0);

  const { title, description, body } = formState;
  const [errorMessage, setErrorMessage] = useState("");

  const [addComment, { error }] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {

  
      // update thought array's cache
      const { comments } = cache.readQuery({ query: QUERY_BLOGS });
      cache.writeQuery({
        query: QUERY_BLOGS,
        data: { comments: [addComment, ...comments] },
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
      await addComment({
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
<div>

  {/* //   <Container */}
  {/* //   style={{
    //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //   }}
  // > */}
  <Row>
  <Col>
  <InputGroup>
  <InputGroup.Text className="formText">Comment</InputGroup.Text>
      <Form.Control 
      className="formBack"
      as="textarea"
      aria-label="With textarea"
      name="body"
      defaultValue={body}
      onBlur={handleChange}
      rows="3" />
    </InputGroup>
      </Col>
      </Row>
<Row>
<Col>
  <br/>
    <Button className="AllBtn" onClick={handleFormSubmit}>Submit Comment         
          </Button>
</Col>
</Row>
  <br/>
    </div>
    // {/* </Container> */}
    );
  };


export default CommentForm;