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
import "./style.css";

const CommentForm = () => {
  const [formState, setFormState] = useState({
    commentBody: ""
   
  });
  const { commentBody } = formState;
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
console.log(commentBody, "commenetsdfsd")
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
console.log(commentBody,"Commented")
    try {
      // add comment to database
      await addComment({
        variables: { commentBody },
      });

      // clear form value
      setFormState("");
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
  <Col className="commentForm">
  <InputGroup>
  <InputGroup.Text className="formText">Comment</InputGroup.Text>
      <Form.Control 
      className="formBack"
      as="textarea"
      aria-label="With textarea"
      name="commentBody"
      defaultValue={commentBody}
      onChange={handleChange}
      rows="3"
      maxLength="140"
      />
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