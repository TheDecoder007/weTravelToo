import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import Button from "react-bootstrap/Button";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_BLOG } from "../utils/queries";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card"

const SingleBlog = (props) => {
  const { id: blogId } = useParams();
  // const { Title: blogTitle} = blog.blogTitle;
  const { loading, data } = useQuery(QUERY_BLOG, {
    variables: { id: blogId },
  });

  const blog = data?.blog || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="projectCont">
      <Row className="sectionTopRow">
      <h3 className="text-center sectionHead">{blog.blogTitle}</h3>
    </Row>
    <Row className="singleCardRow">
      <Card className="singleCard">
        <Card.Header className="cardHeader">
        <Link to={`/profile/${blog.username}`}  className="cardLink" style={{ fontWeight: 700 }}>
            {blog.username} blogged on {blog.createdAt}
          </Link>
        </Card.Header>
        <Card.Body>
        <p>{blog.blogText}</p>
        </Card.Body>
      </Card>
    </Row>
<br/>
      <CommentList comments={blog.comments} />
      <br/>
      {Auth.loggedIn() ? (
        <>
   <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      >

          <CommentForm />
      </Container>
        <Link to="/">
          <Button className="AllBtn ">Go Home
          </Button>
        </Link>
        </>
      ) : (
        <Link to="/">
        <Button className="AllBtn ">Go Home
        </Button>
        </Link>
      )}
      </Container>
  );
};

export default SingleBlog;
