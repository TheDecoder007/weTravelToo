import React from "react";
import BlogForm from "../components/BlogForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function CreateBlog() {
console.log("cherry")

return (
   <Container fluid className="projectCont createCont">
   
      <Row className="sectionTopRow">
        <Col>
            <Link to="/profile">
          <Button className="AllBtn AuthBtn">
              My Profile
          </Button>
              </Link>
        </Col>
        <Col>
          <h3 className="text-center sectionHead">Create a Blog</h3>
        </Col>
        <Col>
            <Link to="/">
          <Button className="AllBtn AuthBtn">
              Home
          </Button>
              </Link>
        </Col>
      </Row>
      <BlogForm />
    </Container>
  );
};
