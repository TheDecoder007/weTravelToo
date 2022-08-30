import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import BlogForm from "../components/BlogForm";
import Auth from "../utils/auth";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function CreateBlog() {
console.log("cherry")

  return (
    <Container fluid className="projectCont">
      <Row className="sectionTopRow">
        <Col>
          <Button className="AllBtn HomeBtn">
            <Link to="/profile">My Profile</Link>
          </Button>
        </Col>
        <Col>
          <h3 className="text-center sectionHead">Create a Blog</h3>
        </Col>
        <Col>
          <Button className="AllBtn HomeBtn">
            <Link to="/home">Home</Link>
          </Button>
        </Col>
      </Row>
      <BlogForm />
    </Container>
  );
};
