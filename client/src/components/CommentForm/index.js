import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";

const CommentForm = () => {


  return (

    <Container
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <InputGroup>
      <InputGroup.Text>With textarea</InputGroup.Text>
      <Form.Control as="textarea" aria-label="With textarea" />
    </InputGroup>

    </Container>
  );
};


export default CommentForm;