import React from "react";
import './style.css';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
//import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
  if (!blogs.length) {
    return <h3>No Blogs Yet</h3>;
  }



  return (
    <div className="cardDiv">
      {blogs &&
        blogs.map(blog => (
          <Col key={blog._id} className="CardCol">
            <Card
              className="text-center wholeCard"
              style={{ width: "16rem", height: "25rem" }}
            >
              <Card.Img src={blog.blogImage} />

              <Card.Body>
                <div className="cardTitle">{blog.blogTitle}</div>

                <Card.Text>{blog.username}</Card.Text>
                <Card.Text>{blog.blogDescription}</Card.Text>
                <>
                </>
              </Card.Body>
              <Card.Footer className="cardFooter">
                <Button href={`/blog/${blog._id}`} className="AllBtn">
                  Read Blog
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
    </div>
  );
}


export default BlogList;


