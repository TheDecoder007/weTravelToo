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
      <h3 className="text-center sectionHead">{blog.username}</h3>
    </Row>
    <Row className="singleCardRow">
      <Card className="singleCard">
        <Card.Header className="cardHeader">
        <Link className="cardLink" to={`/profile/${blog.username}`} style={{ fontWeight: 700 }}>
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

          <Button href="/" className="AllBtn ">Go Home
            {/* <Link className="BtnLink" to="/">Go Home</Link> */}
          </Button>
        </>
      ) : (
        <Button href="/" className="AllBtn ">Go Home
          {/* <Link className="BtnLink" to="/">Go Home</Link> */}
        </Button>
      )}
      </Container>
  );
};

export default SingleBlog;
