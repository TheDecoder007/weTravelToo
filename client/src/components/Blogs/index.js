import React from "react";
import './style.css'
import BlogCard from "./BlogCard";
import { blogs } from "./data";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

//This is where we will map over the array from ./data and create a card for each object
function Blogs() {
  return (
    <Container fluid className="projectCont" id="blogs">
      <Row className="sectionTopRow">
        <h3 className="text-center sectionHead">Recent Blogs</h3>
      </Row>
      <Row className="CardRow">
        
      {blogs.map(blog => {
  return <BlogCards key={blog.blogTitle} {...blog}/>
})}

      </Row>
    </Container>
  );
}

export default Blogs;