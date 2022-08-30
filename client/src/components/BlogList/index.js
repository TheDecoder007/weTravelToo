import React from "react";
import './style.css';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {




  return (
    blogs && !blogs.length? <h3>No Blogs Yet</h3>:
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

                <Card.Text>By {blog.username}</Card.Text>
                <Card.Text>{blog.blogDescription}</Card.Text>
                <>
                </>
              </Card.Body>
              <Card.Footer className="cardFooter">
                <Link to={`/blog/${blog._id}`}>
                <Button className="AllBtn">
                  Read Blog
                </Button>
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
    </div>
  );
}


export default BlogList;


